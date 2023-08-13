import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { BUTTON_STYLE, Button } from "components/button";
import { Text } from "components/text";
import { SignUp } from "components/signup/signup";
import { MenuIcon } from "components/menuIcon/menuIcon";
import { AudioRecorder } from "containers/audioRecorder";
import AccountIcon from "assets/icons/account.svg";
import ProductIcon from "assets/common/product.svg";
import SettingsIcon from "assets/icons/settings.svg";
import TextNoteIcon from "assets/icons/textnote.svg";
import UploadIcon from "assets/icons/upload.svg";
import ArrowLineIcon from "assets/icons/arrow_line.svg";
import BarIcon from "assets/icons/bar.svg";
import RecordIcon from "assets/icons/record.svg";
import LeftFooterLink from "assets/common/left_footer_links.svg";
import RightFooterLink from "assets/common/right_footer_links.svg";
import classes from "./homePage.module.scss";
import colors from "styles/colors.module.scss";
import { AudioSummary } from "containers/audioSummary";
import { Testimonial } from "components/testimonial";
import { fetchTestimonials } from "apis";
import Masonry from "@mui/lab/Masonry";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);
  const [summary, setSummary] = useState();
  const [testimonials, setTestimonials] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { users },
      } = await fetchTestimonials();
      setTestimonials(users);
    };

    fetchData();
  }, []);

  const gotoDemoPage = () => {
    navigate("/demo");
  };

  const handleSignupClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRecordClick = () => {
    setShowRecorder(true);
  };

  const handleCloseRecorder = () => {
    setShowRecorder(false);
  };

  const handleSummaryComplete = (summary) => {
    const { createdAt, note, transcript } = summary;
    setSummary({ createdAt, note: JSON.parse(note), transcript });
    setShowRecorder(false);
  };

  const renderComponents = () => {
    if (showRecorder) {
      return (
        <AudioRecorder
          onClose={handleCloseRecorder}
          onSummaryComplete={handleSummaryComplete}
        />
      );
    }
    if (summary) {
      return <AudioSummary content={summary} />;
    }
  };

  return (
    <>
      <div
        className={classnames(classes.container, { [classes.blur]: showModal })}
      >
        <div className={classnames(classes.flexBetween, classes.mt20)}>
          <MenuIcon icon={AccountIcon} text="Account" />
          <img src={ProductIcon} alt="product hunt icon" />
          <MenuIcon icon={SettingsIcon} text="Settings" textPosition="right" />
        </div>
        <div className={classes.content}>
          <Text className={classes.title} color={colors.grey100}>
            AudioPen
          </Text>
          <div>
            <img src={BarIcon} alt="bar icon" />
          </div>
          <div className={classes.subtitleContainer}>
            <Text className={classes.subtitle} color={colors.grey100}>
              Go from fuzzy thought to clear text.
            </Text>
            <Text className={classes.subtitle_secondary}> Fast.</Text>
          </div>
          {renderComponents()}
          <div
            className={classnames(classes.description, {
              [classes.displayNone]: showRecorder || summary,
            })}
          >
            <Text className={classes.description_content}>
              {`Just hit record. Then start talking.
                AudioPen will clean things up when you're done.`}
            </Text>
          </div>
          <div
            className={classnames(classes.buttonGroup, {
              [classes.displayNone]: showRecorder || summary,
            })}
          >
            <Button
              buttonStyle={BUTTON_STYLE.PRIMARY}
              onClick={handleSignupClick}
            >
              <Text className={classes.buttonText} color={colors.primary25}>
                sign up / log in
              </Text>
            </Button>
            <Button buttonStyle={BUTTON_STYLE.SECONDARY} onClick={gotoDemoPage}>
              <Text className={classes.buttonText} color={colors.grey100}>
                see how it works
              </Text>
            </Button>
          </div>
          <div
            className={classnames(classes.lineArrow, {
              [classes.displayNone]: showRecorder || summary,
            })}
          >
            <img src={ArrowLineIcon} alt="arrow line icon" />
          </div>
        </div>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 7 }} spacing={2}>
          {testimonials.map((item) => {
            return (
              <Testimonial key={item.id} user={item}>
                {item.content}
              </Testimonial>
            );
          })}
        </Masonry>
        <div className={classes.readMore}>
          <Button buttonStyle={BUTTON_STYLE.SECONDARY}>
            <Text className={classes.buttonText} color={colors.grey100}>
              read more Testimonials
            </Text>
          </Button>
        </div>
        <div className={classes.footer}>
          <div className={classes.footerLinks}>
            <img src={LeftFooterLink} alt="footer links" />
            <img src={RightFooterLink} alt="footer links" />
          </div>
        </div>
        <div
          className={classnames(classes.flexBetween, classes.stickyElement, {
            [classes.displayNone]: showRecorder,
          })}
        >
          <MenuIcon icon={UploadIcon} text="Upload Audio" />
          <img
            style={{ cursor: "pointer" }}
            src={RecordIcon}
            alt="record icon"
            width="80"
            height="80"
            onClick={handleRecordClick}
          />
          <MenuIcon
            icon={TextNoteIcon}
            text="Rewrite a Text Note"
            textPosition="right"
          />
        </div>
      </div>
      <SignUp open={showModal} onClose={handleCloseModal} />
    </>
  );
};

export { HomePage };
