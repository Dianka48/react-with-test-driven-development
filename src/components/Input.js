const Input = ({ id, label, onChange, help, type = "text", initialValue }) => {
  let inputClass = "form-control";
  if (help) {
    inputClass += " is-invalid";
  }
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        onChange={onChange}
        className={inputClass}
        defaultValue={initialValue}
      />
      {help && <span className="invalid-feedback">{help}</span>}
    </div>
  );
};

export default Input;
