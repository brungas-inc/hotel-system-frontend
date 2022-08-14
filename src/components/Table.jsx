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
            <td colSpan={props.columns?.length}>
              <ProgressIndicator
                loading={props.loading}
                initialPosition={-200}
                endPosition={3000}
                speed={10}
              />
            </td>
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
                    onRowClick={props.onRowClick}
                    expanded={props.expanded}
                    renderExpanded={props.renderExpanded}
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
const TableRow = ({
  columns,
  item,
  index,
  getCustomRender,
  onRowClick,
  expanded,
  renderExpanded,
}) => {
  console.log(expanded);
  return (
    <>
      <tr
        className={` even:bg-grey-50 odd:bg-white hover:bg-gray-100 ${
          typeof onRowClick == "function" ? "cursor-pointer" : " "
        }  `}
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
      {expanded === item ? (
        <tr>
          <td colSpan={columns.length}>
            {renderExpanded && renderExpanded(expanded, index)}
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default Table;
