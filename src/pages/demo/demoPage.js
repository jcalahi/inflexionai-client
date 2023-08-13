import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { Button, BUTTON_STYLE } from "components/button";
import { Text } from "components/text";
import { SignUp } from "components/signup/signup";
import { ReactComponent as RecordIcon } from "assets/icons/record.svg";
import classes from "./demoPage.module.scss";
import colors from "styles/colors.module.scss";

const DemoPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const gotoHomePage = () => {
    navigate("/");
  };

  const handleSignupClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className={classnames(classes.container, { [classes.blur]: showModal })}
      >
        <RecordIcon className={classes.cursorPointer} onClick={gotoHomePage} />
        <div className={classes.cursorPointer} onClick={gotoHomePage}>
          <Text className={classes.title}>Audio Pen</Text>
        </div>
        <div>
          <Text className={classes.subtitle}>
            Watch a demo of how AudioPen works.
          </Text>
        </div>
        <iframe
          className={classes.iframe}
          title="video"
          height="381"
          width="632"
          src="https://www.youtube.com/embed/FdWlhW-9Es4?autoplay=0"
        />
        <div>
          <Button
            buttonStyle={BUTTON_STYLE.PRIMARY}
            onClick={handleSignupClick}
          >
            <Text color={colors.primary25} className={classes.buttonText}>
              sign up/login
            </Text>
          </Button>
        </div>
      </div>
      <SignUp open={showModal} onClose={handleCloseModal} />
    </>
  );
};

export { DemoPage };
