import Input from "../components/Input";
import { useState, useEffect, useContext } from "react";
import { login } from "../api/apiCalls";
import Alert from "../components/Alert";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import ButtonWithProgress from "../components/ButtonWithProgress";
// import { AuthContext } from "../state/AuthContextWrapper";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../state/authActions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [failMessage, setFailMessage] = useState("");

  // const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const history = useHistory();

  let disabled = !(email && password);

  const submit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    try {
      const response = await login({ email, password });
      dispatch(
        loginSuccess({
          ...response.data,
          header: `Bearer ${response.data.token}`,
        })
      );

      // auth.onLoginSuccess({
      //   isLoggedIn: true,
      //   id: response.data.id,
      // });
      history.push("/");
    } catch (error) {
      setFailMessage(error.response.data.message);
    }
    setApiProgress(false);
  };

  useEffect(() => {
    setFailMessage("");
  }, [email, password]);

  return (
    <div
      className="col-lg-6 col-md-8 offset-lg-3 offset-md-2"
      data-testid="login-page"
    >
      <form className="card">
        <div className="card-header">
          <h1 className="text-center">{t("login")}</h1>
        </div>
        <div className="card-body">
          <Input
            id="email"
            label={t("email")}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            id="password"
            label={t("password")}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          {failMessage && <Alert type="danger">{failMessage}</Alert>}
          <div className="text-center">
            <ButtonWithProgress
              disabled={disabled}
              apiProgress={apiProgress}
              onClick={submit}
            >
              {t("login")}
            </ButtonWithProgress>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
