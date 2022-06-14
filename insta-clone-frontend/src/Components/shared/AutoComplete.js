import React from "react";
import { useState, useEffect } from "react";
import M from "materialize-css";
import { suggestedUserActions } from "../../store/suggestedUserSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AutoComplete() {
  //the below "instance" object is useful and needed to control the drop down which appears.
  const [instance, setInstance] = useState(null);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auto complete component loading!");
    const elems = document.querySelector(".autocomplete");
    M.Autocomplete.init(elems, {
      data: null,
      onAutocomplete: onAutocomplete,
    });

    setInstance(M.Autocomplete.getInstance(elems));
  }, []);

  //when the user has selected a profile: change in state
  const onAutocomplete = (arg) => {
    console.log(arg);
    dispatch(suggestedUserActions.userSearched({ name: arg }));
    navigate("/profileSearchedUser");
  };

  const onAutoCompleteChange = async (e) => {
    console.log("value changed");
    //img url will be saved in below variable
    setUsername(e.target.value);
    if (!e.target.value) {
      console.log("quit");
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

  const onSearchButtonClicked = () => {
    console.log("search button clicked");
  };

  const onEnterPressed = (e) => {
    if (e.key === "Enter") {
      console.log("enter pressed");
    }
  };

  return (
    <div className="row">
      <div className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <i
              onClick={onSearchButtonClicked}
              className="material-icons prefix"
            >
              search
            </i>
            <input
              type="text"
              id="autocomplete-input"
              className="autocomplete"
              onChange={onAutoCompleteChange}
              onKeyDown={onEnterPressed}
              value={username}
            ></input>
            <label htmlFor="autocomplete-input">Search for a user</label>
          </div>
        </div>
      </div>
    </div>
  );
}
