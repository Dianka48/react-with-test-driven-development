const Alert = ({ type = "success", children, center }) => {
  const classForAlert = `alert alert-${type} ${center ? "text-center" : ""}`;

  return <div className={classForAlert}>{children}</div>;
};

export default Alert;
