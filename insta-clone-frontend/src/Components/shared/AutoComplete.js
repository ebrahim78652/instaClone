import React from "react";
import { useState, useEffect } from "react";
import M from "materialize-css";

export default function AutoComplete() {
  const [data, setData] = useState({
    Apple: null,
    Microsoft: null,
    Google: null,
  });
  useEffect(() => {
    console.log("Auto complete component loading!");
    var elems = document.querySelectorAll(".autocomplete");
    console.log(elems);
    M.Autocomplete.init(elems, {
      data: data,
    });
  });

  const onAutoCompleteChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="row">
      <div className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">search</i>
            <input
              type="text"
              id="autocomplete-input"
              className="autocomplete"
              onChange={onAutoCompleteChange}
            ></input>
            <label htmlFor="autocomplete-input">Autocomplete</label>
          </div>
        </div>
      </div>
    </div>
  );
}
