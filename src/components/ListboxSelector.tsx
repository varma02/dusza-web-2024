import {Listbox, ListboxItem, Chip, Selection} from "@nextui-org/react";
import { useState, useMemo } from "react";

export default function ListboxSelector({ options, label, name } 
: { options: { name: string, key: string }[], label: string, name: string }) {

  const [values, setValues] = useState<Selection>(new Set([]));

  const arrayValues = Array.from(values);

  const topContent = useMemo(() => {
    if (!arrayValues.length) return null;
    return (
      <div className="w-full flex flex-wrap py-0.5 px-2 gap-1">
        {arrayValues.map((value) => (
          <Chip key={value}>{options.find((opt) => `${JSON.stringify(opt)}` === `${value}`)?.name}</Chip>
        ))}
      </div>
    );
  }, [arrayValues.length]);

  return (
    <div className="flex flex-col gap-2 flex-1">
      <input type="hidden" name={name} value={JSON.stringify(arrayValues)} />
      <label htmlFor={label}>{label}</label>
      <div className="w-full overflow-y-auto border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        <Listbox
          id={label}
          topContent={topContent}
          classNames={{
            base: "w-full",
          }}
          items={options}
          selectionMode="multiple"
          onSelectionChange={setValues}
          variant="flat"
        >
          {(opt) => (
            <ListboxItem key={JSON.stringify(opt)}>
              {opt.name}
            </ListboxItem>
          )}
        </Listbox>
      </div>
    </div>
  );
}
