import "./Button.css";

export const Button = ({ onClick, text, type = "primary", disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`button ${type === "primary" ? "primary" : "secondary"}`}
      onClick={onClick}
      type={type === "primary" ? "submit" : null}
    >
      {text}
    </button>
  );
};
