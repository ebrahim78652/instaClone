import React from "react";

export default function InputField({ placeholder, type }) {
  return (
    <input
      type={type ? type : null}
      placeholder={placeholder ? placeholder : null}
    />
  );
}
