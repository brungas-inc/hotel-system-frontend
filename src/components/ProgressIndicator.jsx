import { useEffect, useState } from "react";
import React from "react";

const ProgressIndicator = (props) => {
  const [linearPosition, setlinearPosition] = useState(0);

  return props.loading ? (
    <div className="w-full bg-gray-200 h-1 mb-6 relative overflow-hidden">
      <div
        className={`bg-primaryDark h-1 absolute top-0 animate-snake`}
        style={{ width: "40%" }}
      ></div>
    </div>
  ) : null;
};

export default ProgressIndicator;
