import classNames from "classnames";
import { useRouter } from "next/router";
import { ReactElement, useState, useEffect } from "react";
import Input from "../../Input";
import styles from "../style.module.css";
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

const ToolBar: React.FC<ToolBarProps> = ({
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
    .filter((v, i, a) => a.indexOf(v) === i)
    .filter((item) => item !== undefined)
    .sort((a, b) => Number(a) - Number(b));

  const [onchangeSearch, setOnChangeSearch] = useState(search!);

  useEffect(() => {
    setOnChangeSearch(search);
  }, [search]);

  return (
    <div
      className={
        classNames(`${styles["toolbar-container"]}`) +
        ` ` +
        classNames(`${containerClass}`)
      }
    >
      <div className={classNames(`${styles["right"]} gap-2 items-center`)}>
        {/* <h1 className={classNames(`${headingClass}`)}>{title}</h1> */}
        <span className="text-white"> Show </span>
        <select
          onChange={(e) => onChangeItem(Number(e.target.value))}
          className={classNames(`${selectClass} h-8`)}
          value={items}
        >
          {filterData.map((data, i) => {
            return (
              <option key={i} value={data}>
                {data}
              </option>
            );
          })}
        </select>
        <span className="text-white">Entites</span>
      </div>
      <div
        className={
          classNames(`${styles["left"]} flex items-center`) +
          ` ` +
          classNames(`${searchClass}`)
        }
      >
        {children}
        <Input
          placeholder="Search"
          onBlur={(value) =>
            onchangeSearch !== search && onSearch(onchangeSearch)
          }
          setValue={(value) => setOnChangeSearch(value)}
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

export default ToolBar;
