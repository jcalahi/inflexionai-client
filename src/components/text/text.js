import PropTypes from "prop-types";
import classnames from "classnames";
import classes from "./text.module.scss";

const propTypes = {
  color: PropTypes.string,
};

const Text = ({ className, children, color }) => {
  return (
    <span style={{ color }} className={classnames(classes.text, className)}>
      {children}
    </span>
  );
};

Text.propTypes = propTypes;

export { Text };
