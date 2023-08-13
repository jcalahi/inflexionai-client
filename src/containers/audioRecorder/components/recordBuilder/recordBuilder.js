import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Text } from "components/text";
import { summarizeText, transcribeFileContent, uploadAudio } from "apis";
import SpinnerIcon from "assets/icons/spinner.svg";
import colors from "styles/colors.module.scss";
import classes from "./recordBuilder.module.scss";
import { RECORD_BUILDER_STATUS } from "./constants";

const propTypes = {
  blob: PropTypes.object.isRequired,
  onCancel: PropTypes.func,
  onSummaryComplete: PropTypes.func.isRequired,
};

const RecordBuilder = ({ blob, onCancel, onSummaryComplete }) => {
  const [status, setStatus] = useState(RECORD_BUILDER_STATUS.UPLOADING);

  useEffect(() => {
    if (blob) {
      buildAudioSummary(blob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blob]);

  const buildAudioSummary = async (blob) => {
    const fileName = await uploadAudio(blob);
    setStatus(RECORD_BUILDER_STATUS.TRANSCRIBING);
    const {
      data: { text },
    } = await transcribeFileContent(fileName);
    setStatus(RECORD_BUILDER_STATUS.REWRITING);
    const { data } = await summarizeText(text);
    onSummaryComplete(data);
  };

  return (
    <div className={classes.container}>
      <img className={classes.spinner} src={SpinnerIcon} alt="spinner icon" />
      <Text className={classes.statusText} color={colors.primary25}>
        {status}
      </Text>
      <div>
        <Text className={classes.cancelText} color={colors.primary25}>
          cancel
        </Text>
      </div>
    </div>
  );
};

RecordBuilder.prototypes = propTypes;

export { RecordBuilder };
