import axios from "axios";

export const uploadAudio = async (blob) => {
  const formData = new FormData();
  formData.append("recording", blob);
  const {
    data: { filename },
  } = await axios.post("/api/fileupload", formData);
  return filename;
};

export const transcribeFileContent = async (fileName) => {
  const data = await axios.post("/api/transcribe", { fileName });
  return data;
};

export const summarizeText = async (text) => {
  const data = await axios.post("/api/summary", { text });
  return data;
};

export const fetchTestimonials = async () => {
  const data = await axios.get("/api/testimonials");
  return data;
};
