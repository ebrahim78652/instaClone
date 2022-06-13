import React from "react";
import { useState, useEffect } from "react";
import M from "materialize-css";

export default function AutoComplete() {
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    console.log("Auto complete component loading!");
    const elems = document.querySelector(".autocomplete");
    M.Autocomplete.init(elems, {
      data: null,
    });
    setInstance(M.Autocomplete.getInstance(elems));
  }, []);

  const onAutoCompleteChange = async (e) => {
    console.log("value changed");
    //img url will be saved in below variable
    if (!e.target.value) {
      return;
    }
    const response = await fetch(`/user/usersuggestions/${e.target.value}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((resp) => resp.json())
      .then((respBody) => respBody)
      .catch((err) => console.log(err));

    console.log(response);
    const obj = {};
    response.forEach((element) => {
      const name = element.name;
      obj[`${name}`] = null;
    });
    instance.updateData(obj);
    instance.open();
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
            <label htmlFor="autocomplete-input">Search for a user</label>
          </div>
        </div>
      </div>
    </div>
  );
}
