import PropTypes from "prop-types";
import classnames from "classnames";
import { Text } from "components/text";
import classes from "./menuIcon.module.scss";

const propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  textPosition: PropTypes.oneOf(["left", "right"]),
};

const defaultProps = {
  onClick: () => {},
  textPosition: "left",
};

const MenuIcon = ({ className, icon, onClick, text, textPosition }) => {
  return (
    <span
      className={classnames(classes.menuIcon, className)}
      onClick={onClick}
      title="Account"
    >
      <img src={icon} alt="menu icon" />
      <span
        className={classnames(classes.menuIcon_text, {
          [classes[textPosition]]: textPosition,
        })}
      >
        <Text>{text}</Text>
      </span>
    </span>
  );
};

MenuIcon.propTypes = propTypes;
MenuIcon.defaultProps = defaultProps;

export { MenuIcon };
