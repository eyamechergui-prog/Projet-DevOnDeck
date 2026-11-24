function LanguageOption({ name, isSelected, disabled, onToggle }) {
  return (
    <button
      type="button"
      className={`language-option ${isSelected ? "selected" : ""}`}
      onClick={() => onToggle(name)}
      disabled={disabled}
      aria-pressed={isSelected}
    >
      {name}
    </button>
  );
}

export default LanguageOption;
