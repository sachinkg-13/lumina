import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div>
      {label && <label className="" htmlFor={id}></label>}

      <select
        {...props}
        ref={ref}
        className={` px-3 py-2 rounded-[4px] bg-[#d1d5db] text-black outline-none focus:bg-gray-50 duration-200 border-2 border-[#9ca3af] w-full
            ${className}`}
        id={id}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
