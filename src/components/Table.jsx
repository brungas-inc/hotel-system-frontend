import React from "react";
import ProgressIndicator from "./ProgressIndicator";

const Table = (props) => {
  const getCustomRender = (item, index, name) => {
    let custom = props.customRenders || [];
    let customRender = custom.find((e) => e.name === name);
    return customRender ? customRender.render(item, index) : null;
  };

  const hiddenClass = "md:block hidden";

  return (
    <div
      className={`overflow-auto p-2 rounded-lg shadow ${
        props.smallHidden ? hiddenClass : ""
      }`}
    >
      <table className="w-full overflow-x-auto">
        <thead className="bg-grey-50 border-b-2 border-grey-200">
          <tr>
            {props.columns &&
              props.columns.map((item, index) => (
                <th
                  scope="col"
                  key={index}
                  className="px-3 py-5 text-sm font-semibold tracking-wide text-wide text-left whitespace-nowrap"
                >
                  {item.label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-grey-100 ">
          <tr>
            <ProgressIndicator
              initialPosition={-200}
              endPosition={500}
              speed={50}
            />
          </tr>
          {props.items.length
            ? props.items.map((item, i) => {
                return (
                  <TableRow
                    key={i}
                    columns={props.columns}
                    item={item}
                    getCustomRender={getCustomRender}
                    renderRowItem={props.renderRowItem}
                    index={i}
                  />
                );
              })
            : null}
        </tbody>
        {props.renderFooter && <tfoot> {props.renderFooter()}</tfoot>}
      </table>
    </div>
  );
};
const TableRow = ({ columns, item, index, getCustomRender, onRowClick }) => {
  return (
    <tr
      className=" even:bg-grey-50 odd:bg-white hover:bg-grey-50 hover:cursor-pointer"
      onClick={() => {
        if (typeof onRowClick == "function") onRowClick(item);
      }}
    >
      {columns.map((col, i) => {
        return (
          <td
            key={col.name}
            className={
              "p-3 py-5 text-sm text-grey-700 whitespace-nowrap text-left"
            }
          >
            {col.customRender
              ? getCustomRender(item, index, col.name)
              : item[col.name]}
          </td>
        );
      })}
    </tr>
  );
};

export default Table;
