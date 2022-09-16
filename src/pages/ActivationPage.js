import { activate } from "../api/apiCalls";
import { useEffect } from "react";
// import { useParams } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const ActivationPage = (props) => {
  //   const { token } = useParams();
  const [result, setResult] = useState("");

  useEffect(() => {
    const activateRequest = async () => {
      setResult("");
      try {
        await activate(props.match.params.token);
        setResult("success");
      } catch (error) {
        setResult("fail");
      }
    };
    activateRequest();
  }, [props.match.params.token]);

  let content = (
    <Alert type="secondary" center>
      <Spinner size="big" />
    </Alert>
  );
  if (result === "success") {
    content = <Alert>Account is activated</Alert>;
  }
  if (result === "fail") {
    content = <Alert type="danger">Activation failure</Alert>;
  }

  return <div data-testid="activation-page">{content}</div>;
};

export default ActivationPage;
