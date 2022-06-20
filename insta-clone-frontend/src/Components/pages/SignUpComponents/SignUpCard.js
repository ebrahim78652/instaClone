import InputField from "../../shared/InputField";
import Submit from "../../shared/Submit";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { signupContext } from "../../../Contexts/SignUpContext";
export default function SignUpCard() {
  /* //make the inputs controlled elements
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [imgFile, setImgFile] = useState();

  const navigate = useNavigate();

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeFile = (e) => {
    setImgFile(e.target.files[0]);
  };

  const onSubmitButtonPressed = async () => {
    console.log("submit button pressed!");

    const imgUrl = await postDetails(imgFile);

    //add validation for password and email in the end,
    //because might need to make lots of users for testing

    //now do the fetch to the server here.
    //change the link to use the proxy
    const response = await fetch("/user/auth/new-User", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password, email, imgUrl }),
    })
      .then((resp) => resp.json())
      .then((respBody) => respBody)
      .catch((err) => console.log(err));

    if (response.error) {
      M.toast({ html: response.error, classes: "red lighten-2" });
    } else {
      M.toast({ html: response, classes: "green lighten-2" });
      navigate("/login");
    }
  }; */

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
