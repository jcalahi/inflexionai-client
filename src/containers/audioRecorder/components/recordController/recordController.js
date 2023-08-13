import PropTypes from "prop-types";
import { useEffect } from "react";
import { Text } from "components/text";
import { useAudioRecorder } from "react-audio-voice-recorder";
import AudioMotionAnalyzer from "audiomotion-analyzer";
import {
  AUDIO_MOTION_OPTIONS,
  AUDIO_RECORDER_LIMIT,
  AUDIO_RECORDER_OPTIONS,
} from "./constants";
import RestartIcon from "assets/icons/restart.svg";
import CloseIcon from "assets/icons/close.svg";
import StopRecordIcon from "assets/icons/stop_record.svg";
import colors from "styles/colors.module.scss";
import classes from "./recordController.module.scss";

const propTypes = {
  onBlobReady: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const showAlert = (err) => {
  if (err) {
    alert("You must allow your microphone.");
  }
};

const RecordController = ({ onClose, onBlobReady }) => {
  const {
    mediaRecorder,
    recordingBlob,
    recordingTime,
    startRecording,
    stopRecording,
  } = useAudioRecorder(AUDIO_RECORDER_OPTIONS, showAlert);

  // starts recording once the component is visible
  useEffect(() => {
    startRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mediaRecorder) {
      streamAudio(mediaRecorder);
    }
  }, [mediaRecorder]);

  useEffect(() => {
    if (recordingBlob) {
      onBlobReady(recordingBlob);
    }
  }, [recordingBlob, onBlobReady]);

  const streamAudio = (mediaRecorder) => {
    const audioMotion = new AudioMotionAnalyzer(
      document.getElementById("audio"),
      AUDIO_MOTION_OPTIONS
    );

    const stream = audioMotion.audioCtx.createMediaStreamSource(
      mediaRecorder.stream
    );
    audioMotion.connectInput(stream);
    audioMotion.volume = 0;
  };

  const handleRestartBtn = () => {};

  const handleCloseBtn = () => {
    stopRecording();
    onClose();
  };

  const handleStopBtn = () => {
    stopRecording();
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Text className={classes.timer} color={colors.primary25}>
          {new Date(AUDIO_RECORDER_LIMIT - recordingTime * 1000)
            .toISOString()
            .substring(15, 19)}
        </Text>
      </div>
      <div className={classes.audio} id="audio"></div>
      <div className={classes.flexContainer}>
        <img src={RestartIcon} alt="restart icon" onClick={handleRestartBtn} />
        <img src={CloseIcon} alt="close icon" onClick={handleCloseBtn} />
      </div>
      <img
        className={classes.stopRecordIcon}
        src={StopRecordIcon}
        alt="stop record"
        onClick={handleStopBtn}
      />
    </div>
  );
};

RecordController.propTypes = propTypes;

export { RecordController };
