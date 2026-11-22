function FormField({ label, name, value, onChange, error, multiline = false, maxLength }) {
  const Tag = multiline ? "textarea" : "input";

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <Tag
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        rows={multiline ? 5 : undefined}
        aria-invalid={Boolean(error)}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export default FormField;
