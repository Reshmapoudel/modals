import Input from "@/components/Widgets/Input";
import classNames from "classnames";
import { useRouter } from "next/router";
import { ReactElement, useState, useEffect } from "react";
import _ from "underscore";

interface ToolBarProps {
  title: string;
  items: number;
  headingClass?: string;
  containerClass?: string;
  selectClass?: string;
  searchClass?: string;
  search: string;
  children?: ReactElement;
  onSearch: (field: string) => void;
  onChangeItem: (item: number) => void;
}

const SearchTemplate: React.FC<ToolBarProps> = ({
  title,
  onSearch,
  onChangeItem,
  headingClass,
  containerClass,
  selectClass,
  searchClass,
  children,
  search,
  items,
}) => {
  const Routers = useRouter();
  const itemsValue = [10, 20, 50, 100, 500, 1000];
  const filterData = [
    ...itemsValue,
    Routers?.query?.items && Number(Routers?.query?.items),
  ]
    .filter((item) => item !== undefined)
    .sort((a, b) => Number(a) - Number(b));

  const [onchangeSearch, setOnChangeSearch] = useState(search!);

  useEffect(() => {
    setOnChangeSearch(search);
  }, [search]);

  return (
    <div
      className={
        classNames(`flex ml-4 pt-1`) + ` ` + classNames(`${containerClass}`)
      }
    >
      {/* <div className="flex mr-auto gap-2 items-center">
        <span className="text-rt-docketBankGray"> Show </span>
        <select
          onChange={(e) => onChangeItem(Number(e.target.value))}
          className={classNames(
            `${selectClass} h-8 border rounded outline-none`
          )}
          value={items}
        >
          {filterData.map((data, i) => {
            return (
              <option key={i} value={data}>
                {data}
              </option>
            )
          })}
        </select>
        <span className="text-rt-docketBankGray">Entites</span>
      </div> */}
      <div
        className={
          classNames(`ml-auto flex items-center`) +
          ` ` +
          classNames(`${searchClass}`)
        }
      >
        {children}
        <Input
          placeholder="Search"
          setValue={(value) => setOnChangeSearch(value)}
          onBlur={(value) =>
            onchangeSearch !== search && onSearch(onchangeSearch)
          }
          type="text"
          className="h-8 w-60 from-control"
          value={onchangeSearch}
          handleKeyDown={(event) =>
            event.key === "Enter" && onSearch(onchangeSearch)
          }
        />
      </div>
    </div>
  );
};

export default SearchTemplate;
