import PropTypes from "prop-types";
import { useState } from "react";
import moment from "moment";
import { Text } from "components/text";
import BarIcon from "assets/icons/bar.svg";
import TrashIcon from "assets/icons/trash.svg";
import CopyIcon from "assets/icons/copy.svg";
import SaveIcon from "assets/icons/save.svg";
import colors from "styles/colors.module.scss";
import classes from "./audioSummary.module.scss";

const propTypes = {
  content: PropTypes.object.isRequired,
};

const AudioSummary = ({ content }) => {
  const [showTranscript, setShowTranscript] = useState(false);

  const toggleTranscript = () => {
    setShowTranscript(!showTranscript);
  };

  return (
    <div>
      <div className={classes.container}>
        <Text className={classes.title} color={colors.primary25}>
          {content.note.title}
        </Text>
        <Text className={classes.date} color={colors.primary25}>
          {moment(content.createdDate).format("ll")}
        </Text>
        <div className={classes.summary}>
          <Text className={classes.summaryText} color={colors.primary25}>
            {content.note.summary}
          </Text>
        </div>
        <img src={BarIcon} alt="bar icon" />
        <div className={classes.summaryOptions}>
          <button className={classes.addTagBtn}>
            <Text color={colors.primary25}>+ add tag</Text>
          </button>
          <div className={classes.controls}>
            <img src={TrashIcon} alt="trash icon" />
            <img src={CopyIcon} alt="copy icon" />
            <img src={SaveIcon} alt="save icon" />
          </div>
        </div>
      </div>
      <div className={classes.transcript} hidden={!showTranscript}>
        <Text className={classes.transcriptText} color={colors.grey100}>
          {content.transcript}
        </Text>
        <div className={classes.transcriptFooter}>
          <Text className={classes.footerBtn} color={colors.grey100}>
            copy transcript
          </Text>
          <Text className={classes.footerBtn} color={colors.grey100}>
            copy note + transcript
          </Text>
        </div>
      </div>
      <div className={classes.toggleBtn} onClick={toggleTranscript}>
        <Text className={classes.toggleBtnText} color={colors.primary25}>
          view original transcript
        </Text>
      </div>
    </div>
  );
};

AudioSummary.propTypes = propTypes;

export { AudioSummary };
