import { Input } from "@mantine/core";
import { DynamicInputDatapciker } from "../ui/dynamic-input-datapicker/DynamicInputDatapicker";
import DynamicSelect from "../ui/dynamic-select/DynamicSelect";

export const changeValue = (
  type: string,
  placeholder: string,
  data?: (string | number)[]
) => {
  switch (type) {
    case "DynamicSelect":
      return (
        <DynamicSelect
          placeholder={placeholder}
          data={data || []}
          label=""
          onChange={() => {}} // Пример фиктивной функции onChange
        />
      );
    case "Input":
      return <Input placeholder={placeholder} />;
    case "DynamicInputDatapciker":
      return <DynamicInputDatapciker placeholder={placeholder} label="" />;

    default:
      return null;
  }
};
