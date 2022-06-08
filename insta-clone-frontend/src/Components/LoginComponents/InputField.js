import React from "react";

export default function InputField({ placeholder, type }) {
  return (
    <input
      style={{ width: "80%" }}
      type={type ? type : null}
      placeholder={placeholder ? placeholder : null}
    />
  );
}
