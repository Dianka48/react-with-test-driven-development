// import { Component } from "react";
import { useState } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { signUp } from "../api/apiCalls";
import Alert from "../components/Alert";
// import withHover from "../withHover";
import ButtonWithProgress from "../components/ButtonWithProgress";

const SignUpPage = ({ t, i18n }) => {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const onChangePassword = (event) => {
    const currentValue = event.target.value;
    setPassword(currentValue);
    setErrors((prev) => {
      const newState = { ...prev };
      delete newState.password;
      return newState;
    });
  };

  const onChangePasswordRepeat = (event) => {
    const currentValue = event.target.value;
    setPasswordRepeat(currentValue);
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
    setErrors((prev) => {
      const newState = { ...prev };
      delete newState.username;
      return newState;
    });
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
    setErrors((prev) => {
      const newState = { ...prev };
      delete newState.email;
      return newState;
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    const body = {
      username,
      email,
      password,
    };
    setApiProgress(true);
    try {
      await signUp(body);
      setSignUpSuccess(true);
    } catch (error) {
      if (error.response.status === 400) {
        setErrors(error.response.data.validationErrors);
      }
    } finally {
      setApiProgress(false);
    }
  };

  let disabled = true;
  if (password || passwordRepeat) {
    disabled = password !== passwordRepeat;
  }

  let passwordMismatch =
    password !== passwordRepeat ? t("passwordMismatchValidation") : "";

  return (
    <div
      className="col-lg-6 col-md-8 offset-lg-3 offset-md-2"
      data-testid="signup-page"
    >
      {!signUpSuccess && (
        <form className="card" data-testid="form-sign-up">
          <div className="card-header">
            <h1 className="text-center">{t("signUp")}</h1>
          </div>
          <div className="card-body">
            <Input
              id="username"
              label={t("username")}
              onChange={onChangeUsername}
              help={errors.username}
            />
            <Input
              id="email"
              label={t("email")}
              onChange={onChangeEmail}
              help={errors.email}
            />
            <Input
              id="password"
              label={t("password")}
              onChange={onChangePassword}
              help={errors.password}
              type="password"
            />
            <Input
              id="passwordRepeat"
              label={t("passwordRepeat")}
              onChange={onChangePasswordRepeat}
              help={passwordMismatch}
              type="password"
            />
            <div className="text-center">
              <ButtonWithProgress
                disabled={disabled}
                apiProgress={apiProgress}
                onClick={submit}
              >
                {t("signUp")}
              </ButtonWithProgress>
            </div>
          </div>
        </form>
      )}
      {signUpSuccess && (
        <Alert>Please check yoour e-mail to activate your account</Alert>
      )}
    </div>
  );
};

// class SignUpPage extends Component {
//   render() {
//     return <h1>Sign Up</h1>;
//   }
// }

const SignUpPageWithTranslation = withTranslation()(SignUpPage);

export default SignUpPageWithTranslation;
