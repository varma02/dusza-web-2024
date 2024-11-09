import { object, string } from "zod"

export const signUpSchema = object({
  username: string().min(1, "Felhasználónév megadása kötelező"),
  password: string({ required_error: "Jelszó megadása kötelező" }).min(6, "A jelszónak legalább 6 karakterből kell állnia"),
  name: string().min(1, "Csapatnév megadása kötelező"),
  school: string().min(1, "Iskola választása kötelező"),
  member_1_name: string().min(1, "Név megadása kötelező"),
  member_1_grade: string()
    .refine(num => !isNaN(Number(num)), { message: "Érvénytelen évfolyam" })
    .refine(num => !(Number(num) < 8 || Number(num) > 13), { message: "8. és 13. évfolyam közötti diákok jelentkezhetnek" }),
  member_2_name: string().min(1, "Név megadása kötelező"),
  member_2_grade: string()
    .refine(num => !isNaN(Number(num)), { message: "Érvénytelen évfolyam" })
    .refine(num => !(Number(num) < 8 || Number(num) > 13), { message: "8. és 13. évfolyam közötti diákok jelentkezhetnek" }),
  member_3_name: string().min(1, "Név megadása kötelező"),
  member_3_grade: string()
  .refine(num => !isNaN(Number(num)), { message: "Érvénytelen évfolyam" })
  .refine(num => !(Number(num) < 8 || Number(num) > 13), { message: "8. és 13. évfolyam közötti diákok jelentkezhetnek" }),
  member_sub_name: string().optional(),
  member_sub_grade: string().optional()
    .refine(num => num === undefined || num.trim().length === 0 || !isNaN(Number(num)), { message: "Érvénytelen évfolyam" })
    .refine(num => num === undefined || num.trim().length === 0 || !(Number(num) < 8 || Number(num) > 13), { message: "8. és 13. évfolyam közötti diákok jelentkezhetnek" }),
  teachers: string(),
  category: string().min(1, "Kategória választása kötelező"),
  programming_language: string().min(1, "Programnyelv választása kötelező")
})
  .refine(data => !(data.member_sub_grade && data.member_sub_grade.trim().length > 0 && (data.member_sub_name === undefined || data.member_sub_name.trim().length === 0)),
    { message: "Név megadása kötelező", path: [ "member_sub_name" ] })
  .refine(data => !(data.member_sub_name && data.member_sub_name.trim().length > 0 && (data.member_sub_grade === undefined || data.member_sub_grade.trim().length === 0)),
    { message: "Érvénytelen évfolyam", path: [ "member_sub_grade" ] })