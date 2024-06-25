import { ChangeEvent, Dispatch } from "react";
interface IHandleChangeProps {
  e: ChangeEvent<HTMLInputElement>;
  setCode: Dispatch<React.SetStateAction<string>>;
  count: number;
}
export const handleChange = ({ e, setCode, count }: IHandleChangeProps) => {
  let inputValue = e.target.value.replace(/-/g, "");
  if (inputValue.length > count) {
    return;
  }
  setCode(inputValue);
};
