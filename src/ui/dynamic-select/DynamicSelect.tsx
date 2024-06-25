import React from "react";
import { Select } from "@mantine/core";

interface DynamicSelectProps {
  data: string[];
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (selected: string) => void;
  clearable?: boolean;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({
  data,
  label,
  placeholder,
  value,
  onChange,
  clearable,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={data}
      value={value}
      onChange={handleChange}
      clearable={clearable}
    />
  );
};

export default DynamicSelect;
