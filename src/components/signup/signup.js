import PropTypes from "prop-types";
import * as Dialog from "@radix-ui/react-dialog";
import { Text } from "components/text";
import { Button, BUTTON_STYLE } from "components/button";
import colors from "styles/colors.module.scss";
import classes from "./signup.module.scss";

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const SignUp = ({ open, onClose }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={classes.overlay} />
        <Dialog.Content className={classes.content}>
          <Text className={classes.title} color={colors.grey100}>
            Sign up or Log in
          </Text>
          <Button className={classes.button} buttonStyle={BUTTON_STYLE.PRIMARY}>
            <Text className={classes.buttonText} color={colors.primary25}>
              sign in with Google
            </Text>
          </Button>
          <Button
            className={classes.button}
            buttonStyle={BUTTON_STYLE.SECONDARY}
          >
            <Text className={classes.buttonText} color={colors.grey100}>
              or sign up / log in with email
            </Text>
          </Button>
          <Text className={classes.footerText}>
            {`by signing up, you agree to AudioPen's
            Policy and Terms of Use.`}
          </Text>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

SignUp.propTypes = propTypes;

export { SignUp };
