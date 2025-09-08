import styles from "./Button.module.css";

function Button({
  text,
  customType = "primary",
  type = "button",
  children,
  className = "",
  onClick,
}) {
  const buttonType =
    customType === "primary" ? styles.primary : styles.secondary;
  const additionalClass = className ? styles[className] : "";

  return (
    <button
      type={type}
      className={`${styles.button} ${buttonType} ${additionalClass}`}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
}

export default Button;
