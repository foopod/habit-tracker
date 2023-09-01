import "./Button.css";

export const Button = ({ onClick, text, type = "primary", disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`button ${type}`}
      onClick={onClick}
      type={type === "primary" ? "submit" : null}
    >
      {text}
    </button>
  );
};
