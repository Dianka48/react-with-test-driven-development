const Spinner = ({ size }) => {
  const spanClass = `spinner-border ${
    size !== "big" ? "spinner-border-sm" : ""
  }`;
  return <span className={spanClass} role="status"></span>;
};

export default Spinner;
