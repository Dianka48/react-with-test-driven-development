import ButtonWithProgress from "./ButtonWithProgress";

const Modal = ({
  content,
  confirmButton = "Yes",
  cancelButton = "Cancel",
  onClickCancel,
  onClickConfirm,
  apiProgress = false,
}) => {
  return (
    <div
      className="modal bg-black bg-opacity-50 d-block show"
      tabIndex="-1"
      data-testid="modal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <p>{content}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClickCancel}
            >
              {cancelButton}
            </button>
            <ButtonWithProgress
              apiProgress={apiProgress}
              onClick={onClickConfirm}
            >
              {confirmButton}
            </ButtonWithProgress>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  onClickCancel: () => console.log("onClickCancel is not set"),
  onClickConfirm: () => console.log("onClickConfirm is not set"),
};

export default Modal;
