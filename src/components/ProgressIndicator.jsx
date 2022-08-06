import { useEffect, useState } from "react";
import React from "react";

const ProgressIndicator = (props) => {
  const [linearPosition, setlinearPosition] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (linearPosition < props.endPosition)
        setlinearPosition((prevState) => prevState + 15);
      else {
        setlinearPosition(props.initialPosition);
      }
    }, props.speed || 50);
  }, [linearPosition]);
  return props.loading ? (
    <div className="w-full bg-gray-200 h-1 mb-6 relative overflow-hidden">
      <div
        className={`bg-blue-600 h-1 absolute top-0 ease-linear duration-300`}
        style={{ width: props.width || "40%", left: linearPosition }}
      ></div>
    </div>
  ) : null;
};

export default ProgressIndicator;
