import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  primary = false,
  outline = false,
  small = false,
  medium = false,
  disabled = false,
  solout = false,
  children,
  onClick,
  passProps,
}) {
  let Comp = "button";
  const classes = cx("wrapper", {
    primary,
    outline,
    small,
    disabled,
    solout,
  });
  const props = {
    onClick,
    ...passProps,
  };
  if (disabled) {
    delete props.onClick;
  }
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }
  return (
    <Comp className={classes} {...props}>
      <span>{children}</span>
    </Comp>
  );
}
export default Button;
