import defaultProfileImage from "../assets/profile.png";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Input from "./Input";
import { updateUser, deleteUser } from "../api/apiCalls";
import ButtonWithProgress from "./ButtonWithProgress";
import Modal from "./Modal";
import { useHistory } from "react-router-dom";
import { userUpdateSuccess, logoutSuccess } from "../state/authActions";

const ProfileCard = ({ user }) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [updateApiProgress, setUpdateApiProgress] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteApiProgress, setDeleteApiProgress] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const { id, username } = useSelector((store) => ({
    id: store.id,
    username: store.username,
  }));

  const onClickSave = async () => {
    setUpdateApiProgress(true);
    try {
      await updateUser(id, { username: newUsername });
      dispatch(
        userUpdateSuccess({
          username: newUsername,
        })
      );
      setInEditMode(false);
    } catch (error) {}
    setUpdateApiProgress(false);
  };

  const onClickCancel = () => {
    setInEditMode(false);
    setNewUsername(username);
  };

  const onClickDelete = async () => {
    setDeleteApiProgress(true);
    try {
      await deleteUser(id);
      dispatch(logoutSuccess());
      history.push("/");
    } catch (error) {}
    setDeleteApiProgress(false);
  };

  let content;

  if (inEditMode) {
    content = (
      <>
        <Input
          label="Change your username"
          id="username"
          initialValue={newUsername}
          onChange={(event) => setNewUsername(event.target.value)}
        />
        <ButtonWithProgress
          className="btn btn-primary "
          apiProgress={updateApiProgress}
          onClick={onClickSave}
        >
          Save
        </ButtonWithProgress>
        <button
          className="btn btn-outline-secondary ms-2"
          onClick={onClickCancel}
        >
          Cancel
        </button>
      </>
    );
  } else {
    content = (
      <>
        <h3>{newUsername}</h3>
        {user.id === id && (
          <>
            <div>
              <button
                className="btn btn-outline-success"
                onClick={() => setInEditMode(true)}
              >
                Edit
              </button>
            </div>
            <div className="pt-2">
              <button
                className="btn btn-danger"
                onClick={() => setModalVisible(true)}
              >
                Delete My Account
              </button>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <img
            src={defaultProfileImage}
            alt="profile"
            width="200"
            height="200"
            className="rounded-circle shadow me-2"
          />
        </div>
        <div className="card-body">{content}</div>
      </div>
      {modalVisible && (
        <Modal
          content="Are you sure to delete your account?"
          onClickCancel={() => setModalVisible(false)}
          onClickConfirm={onClickDelete}
          apiProgress={deleteApiProgress}
        />
      )}
    </>
  );
};

export default ProfileCard;
