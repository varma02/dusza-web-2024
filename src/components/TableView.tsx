'use client'

import { useState, useMemo, useCallback, type Key, ReactNode } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Pagination, Selection, SortDescriptor, Spinner } from "@nextui-org/react";
import { MdSearch, MdKeyboardArrowDown } from "react-icons/md";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function TableView({columns, data, initial_visible, actions, isLoading} : {
  columns: {uid:string, name:string, sortable?: boolean}[], 
  data: {id:string, name:string, [key:string]:string|number}[], 
  initial_visible: string[],
  actions?: {name: string, icon?: ReactNode, description?: string, handler: (selected: Selection) => void}[],
  isLoading?: boolean
}) {
  type DataType = typeof data[0];
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(initial_visible));
  const rowsPerPage = 10
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredData = [...data];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((d) =>
        d.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredData;
  }, [data, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: DataType, b: DataType) => {
      const first = a[sortDescriptor.column as keyof DataType] as number;
      const second = b[sortDescriptor.column as keyof DataType] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((d: DataType, columnKey: Key) => {
    const cellValue = d[columnKey as keyof DataType];

    switch (columnKey) {
      // case "actions":
      //   return (
      //     <div className="flex gap-2">
      //       {actions?.map((action) => (
      //         <Button key={action.name} size="sm" onPress={() => action.handler(d.id)}>
      //           {action.label || action.name}
      //         </Button>
      //       ))}
      //     </div>
      //   );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Keresés név alapján..."
            startContent={<MdSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<MdKeyboardArrowDown className="text-small" />} variant="flat">
                  Oszlopok
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="A táblázat oszlopainak kiválasztása"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {actions ? (
            <Dropdown>
              <DropdownTrigger className="">
                <Button endContent={<MdKeyboardArrowDown className="text-small" />} color="primary">
                  Műveletek
                </Button>
              </DropdownTrigger>
              <DropdownMenu
              onAction={(key) => actions.find((v)=>v.name==key)!.handler(selectedKeys)}>
                {actions.map((a) => (
                  <DropdownItem key={a.name}
                  description={a.description}
                  startContent={a.icon}>
                    {a.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            ) : ""}
          </div>
        </div>
      </div>
    );
  }, [filterValue, visibleColumns, onSearchChange, hasSearchFilter, selectedKeys]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Összes elem kiválasztva"
            : `${selectedKeys.size} / ${filteredItems.length} kiválasztva`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Előző oldal
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Következő oldal
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "end" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody 
      emptyContent={"Nincs adat."} 
      items={sortedItems}
      loadingContent={<Spinner />}
      loadingState={isLoading ? "loading" : "idle"}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
