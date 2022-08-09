import { Button } from "@material-tailwind/react";
import React from "react";

export default function Pagination(props) {
  const getLinks = () => {
    let lastPage = props.data.pagination.totalPages,
      currentPage = props.data.pagination.currentPage,
      linksLimit = 10;
    let links = [];

    if (lastPage && linksLimit) {
      let sideLinks = Math.floor(linksLimit / 2);

      // links before current page
      links.push({
        label: "keyboard_double_arrow_left",
        page: 1,
        className: "icon p-0 h-7 w-7 rounded-lg",
        disabled: currentPage <= 1,
      });
      links.push({
        label: "keyboard_arrow_left",
        page: currentPage - 1,
        className: "icon p-0 h-7 w-7 rounded-lg ",
        disabled: currentPage <= 1,
      });

      for (let i = currentPage - sideLinks; i <= currentPage; i++) {
        if (i === currentPage) {
          links.push({
            label: i,
            page: i,
            className:
              "bg-accentColor border-accentColor transition ease-in-out",
          });
        } else {
          if (i > 0 && i <= lastPage) {
            links.push({ label: i, page: i });
          }
        }
      }

      // links after current page
      for (let i = currentPage + 1; i <= currentPage + sideLinks; i++) {
        if (i === currentPage) {
          links.push({
            label: i,
            page: i,
            className:
              "bg-accentColor  border-accentColor transition ease-in-out",
          });
        } else {
          if (i > 0 && i <= lastPage) {
            links.push({ label: i, page: i });
          }
        }
      }

      links.push({
        label: "keyboard_arrow_right",
        page: currentPage + 1,
        className: "icon p-0 h-7 w-7 rounded-lg",
        disabled: currentPage >= lastPage,
      });
      links.push({
        label: "keyboard_double_arrow_right",
        page: lastPage,
        className: "icon p-0 h-7 w-7 rounded-lg",
        disabled: currentPage >= lastPage,
      });
    }

    return links;
  };

  const onClick = (e) => props.onChange && props.onChange(e.page);

  return (
    <nav className={"text-center" + (getLinks().length ? " mt-6" : "")}>
      <div className="flex align-center justify-center gap-2">
        {getLinks().map((e, i) => (
          <button
            disabled={e.disabled}
            className={`rounded-3xl hover:shadow-lg inline-flex flex-row justify-center h-8 items-center hover:bg-blend-darken text-text leading-none border border-slate-600 border-solid cursor-pointer px-3 py-0 ${e.className}`}
            key={i}
            onClick={() => onClick(e)}
          >
            {e.className && e.className.indexOf("icon") !== -1 ? (
              <span className="material-icons">{e.label}</span>
            ) : (
              <>{e.label}</>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
