import { Select } from "@mantine/core";

interface SelectWithChildren {
  data: (string | number)[];
  label: string;
  placeholder: string;
  value: string | null;
  setValue: any;
}

export const DynamicSelect = ({
  data,
  label,
  placeholder,
  value,
  setValue,
}: SelectWithChildren) => {
  // Convert number[] to string[]
  const transformedData = data.map((item) => item.toString());

  return (
    <Select
      label={label}
      placeholder={`${placeholder}ni tanlash uchun bosing`}
      data={transformedData}
      // defaultValue='React'
      value={value}
      onChange={(e) => setValue(e)}
      clearable
    />
  );
};
