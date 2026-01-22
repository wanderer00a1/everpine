import type { ChangeEvent } from "react";
import Select from "./Select";
import { useSearchParams } from "react-router";

export interface optionsProp {
  value?: string;
  label?: string;
}
interface SortByProp {
  options: optionsProp[];
}

function SortBy({ options }: SortByProp) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e: ChangeEvent) {
    searchParams.set("sortBy", (e.target as HTMLInputElement).value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
