import InputField from "../../shared/InputField";
import Submit from "../../shared/Submit";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { signupContext } from "../../../Contexts/SignUpContext";
export default function SignUpCard() {
  const {
    name,
    onChangeName,
    email,
    onChangeEmail,
    password,
    onChangePassword,
    onChangeFile,
    onSubmitButtonPressed,
  } = useContext(signupContext);

  return (
    <>
      <div className="card_my_own">
        <div className="cardTitle">Instagram</div>
        <InputField
          value={name}
          onChange={onChangeName}
          type="text"
          placeholder="name"
        />
        <InputField
          value={email}
          onChange={onChangeEmail}
          type="email"
          placeholder="email"
        />
        <InputField
          onChange={onChangePassword}
          value={password}
          type="password"
          placeholder="password"
        />
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            {/*add the on change on the below line*/}
            <input
              onChange={onChangeFile}
              type="file"
              placeholder="file path here"
            />
          </div>
          <div className="file-path-wrapper">
            <input
              type="text"
              placeholder="profile picture"
              className="file-path validate"
            ></input>
          </div>
        </div>

        <Submit onClick={onSubmitButtonPressed} nameOfButton="Sign Up" />
        <Link to="/login">Already have an account?</Link>
      </div>
    </>
  );
}
