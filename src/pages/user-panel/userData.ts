const data: string[] = ["O'zbekiston", "Chet el", "Fuqaroligi yoq"];
const genderData: string[] = ["Erkak", "Ayol"];
const levelData: string[] = ["Fan nomzidi", "Fan doktori", "Yoq"];
const titleData: string[] = [
  "Dotsent",
  "Professor",
  "Katta ilmiy xodim",
  "Akademik	",
];
const yearData: number[] = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
export const modalData: {
  p: string;
  type: string;
  placeholder: string;
  data?: string[] | number[];
}[] = [
  {
    p: "FUQAROLIK",
    type: "DynamicSelect",
    placeholder: "Fuqarolik",
    data: data,
  },
  { p: "PASPORT RAQAMI", type: "Input", placeholder: "AA0000001" },
  { p: "JSHPR-kod", type: "Input", placeholder: "3453564356345" },
  { p: "FAMILIYA", type: "Input", placeholder: "Jahongir" },
  { p: "ISM", type: "Input", placeholder: "Mirhalikov" },
  { p: "OTASINING ISMI", type: "Input", placeholder: "Shavkatovich" },
  {
    p: "TUG'ILGAN SANA",
    type: "DynamicInputDatapciker",
    placeholder: "Nov 23, 2006",
  },
  {
    p: "JINS",
    type: "DynamicSelect",
    placeholder: "Jins",
    data: genderData,
  },
  { p: "Uy MANZIL", type: "Input", placeholder: "Booburshox 25-dom 7-kv" },
  {
    p: "MUTAXASISLIK",
    type: "Input",
    placeholder: "Axborot texonologiyalari",
  },
  {
    p: "ILMIY DARAJA",
    type: "DynamicSelect",
    placeholder: "Ilmiy daraja",
    data: levelData,
  },
  {
    p: "ILMIY UNVON",
    type: "DynamicSelect",
    placeholder: "Ilmiy unvon",
    data: titleData,
  },
  {
    p: "ISHGA KIRGAN YILI",
    type: "DynamicSelect",
    placeholder: "Ishga kirgan",
    data: yearData,
  },
  { p: "TELEFON", type: "Input", placeholder: "+998 90 222 05 36" },
  { p: "", type: "Input", placeholder: "*********" },
];
