import React, { useState, useRef, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import Checkbox from "@material-tailwind/react/components/Checkbox";
import { TAILWIND_COLORS } from "../../../utils/constants";
// import CheckBox from "../../../components/CheckBox";
import CheckBox from "../../../components/CheckBox";

const AddRole = () => {
  const [checkedPermissions, setCheckedPermissions] = useState([]);
  const {
    data: permissions,
    loading,
    error,
    loadData,
  } = useFetch("access-control/permissions", { limit: 1000 }, true, {
    data: [],
    pagination: { totalPages: 0 },
  });

  console.log(checkedPermissions);

  const isChecked = (i) => {
    return checkedPermissions.find((val) => val == i._id);
  };

  const check = (item) => setCheckedPermissions([...checkedPermissions, item]);

  const uncheck = (item) =>
    setCheckedPermissions([...checkedPermissions.filter((val) => val != item)]);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 mt-5 ">
      <div className="flex flex-col"></div>
      <div className="flex flex-col">
        <h1>Select Permissions</h1>
        <div className="overflow-y-auto h-80 flex flex-col">
          {permissions?.data?.map((item, index) => (
            <CheckBox
              key={index}
              label={item.displayName}
              color={TAILWIND_COLORS.primary}
              checked={isChecked(item)}
              onChange={(event) => {
                let checked = event.target.checked;
                console.log(event.target);
                if (checked) {
                  console.log("checked");
                } else console.log("unchecked");
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddRole;
