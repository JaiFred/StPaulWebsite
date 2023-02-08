export const Input = ({
  label,
  name,
  type,
  id,
  placeholder,
  value,
  onChange,
  required,
  children
}) => (
  <div className="mb-3">
    {label && (
      <label for={id} className={"form-label d-flex justify-content-between align-items-center"}>
        {label}
        {children}
      </label>
    )}
    <div>
      <input
        type={type}
        name={name}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        autoComplete={name}
      />
    </div>
  </div>
);
