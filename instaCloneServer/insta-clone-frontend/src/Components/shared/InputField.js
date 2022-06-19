import React from "react";

export default function InputField({
  placeholder,
  type,
  className,
  value,
  onChange,
}) {
  return (
    <input
      type={type ? type : null}
      placeholder={placeholder ? placeholder : null}
      className={className ? className : null}
      value={value ? value : ""}
      onChange={onChange ? onChange : null}
    />
  );
}
/* style={{ width: "80%" }}
 */
