import React from "react";

export default function InputField({ placeholder, type, className }) {
  return (
    <input
      type={type ? type : null}
      placeholder={placeholder ? placeholder : null}
      className={className ? className : null}
    />
  );
}
/* style={{ width: "80%" }}
 */
