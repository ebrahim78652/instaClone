import React from "react";

export default function Submit({ nameOfButton, onClick }) {
  return (
    <>
      <div onClick={onClick} className="submit">
        {nameOfButton}
      </div>
    </>
  );
}
