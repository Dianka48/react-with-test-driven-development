import { useEffect, useState } from "react";
import { getUserById } from "../api/apiCalls";
import ProfileCard from "../components/ProfileCard";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

const UserPage = (props) => {
  const [user, setUser] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [failResponse, setFailResponse] = useState("");

  useEffect(() => {
    setPendingApiCall(true);
    const getUser = async () => {
      try {
        const response = await getUserById(props.match.params.id);
        setUser(response.data);
      } catch (error) {
        setFailResponse(error.response.data.message);
      }
      setPendingApiCall(false);
    };

    getUser();
  }, [props.match.params.id]);

  let content = (
    <Alert type="secondary" center>
      <Spinner size="big" />
    </Alert>
  );
  if (!pendingApiCall) {
    if (failResponse) {
      content = (
        <Alert type="danger" center>
          {failResponse}
        </Alert>
      );
    } else {
      content = <ProfileCard user={user} />;
    }
  }

  return <div data-testid="user-page ">{content}</div>;
};

export default UserPage;
