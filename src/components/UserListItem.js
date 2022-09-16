import { withRouter } from "react-router";
import defaultProfileImage from "../assets/profile.png";

const UserListItem = ({ user, history }) => {
  return (
    <li
      className="list-group-item list-group-item-action"
      onClick={() => history.push(`/user/${user.id}`)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={defaultProfileImage}
        alt="profile"
        width="30"
        className="rounded-circle shadow-sm me-2"
      />
      {user.username}
    </li>
  );
};

export default withRouter(UserListItem);
