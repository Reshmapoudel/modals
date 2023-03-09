import { ReactNode, useState } from "react";
import classNames from "classnames";
import style from "../style.module.css";
import Checkbox from "../../Checkbox";

interface HeaderProps {
  name: string | ReactNode;
  field: string;
  sortable: boolean;
  width: string;
}

interface HeaderArrayProps {
  headers: Array<HeaderProps>;
  selectAllHandel?: (status: boolean) => void;
}

const Header: React.FC<HeaderArrayProps> = ({ headers, selectAllHandel }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field: any) => {
    const order =
      field == sortingField && sortingOrder === "asc" ? "desc" : "asc";
    setSortingField(field);
    setSortingOrder(order);
  };
  return (
    <thead className={classNames(` ${style["table-head"]}`)}>
      <tr>
        {headers.map(({ name, field, sortable, width }, idx) => (
          <th
            scope="col"
            className={classNames(`${style["row"]} ${width} `)}
            key={idx}
            onClick={() => (sortable ? onSortingChange(field) : null)}
          >
            {name === "CHECKBOX" ? (
              <span className="flex items-center gap-2">
                <Checkbox
                  value="false"
                  name="all"
                  type="checkbox"
                  className="w-5 h-5"
                  setValue={(value) => selectAllHandel!(value as boolean)}
                />
              </span>
            ) : (
              name
            )}

            {sortingField &&
              sortingOrder === field &&
              (sortingOrder === "asc"
                ? `<i class="fas fa-arrow-down"></i>`
                : `<i class="fas fa-arrow-up"></i>`)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
