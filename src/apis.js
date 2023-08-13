import axios from "axios";

const SERVER_URL = "https://inflexioai-api-production.up.railway.app";

export const uploadAudio = async (blob) => {
  const formData = new FormData();
  formData.append("recording", blob);
  const {
    data: { filename },
  } = await axios.post(`${SERVER_URL}/api/fileupload`, formData);
  return filename;
};

export const transcribeFileContent = async (fileName) => {
  const data = await axios.post(`${SERVER_URL}/api/transcribe`, { fileName });
  return data;
};

export const summarizeText = async (text) => {
  const data = await axios.post(`${SERVER_URL}/api/summary`, { text });
  return data;
};

export const fetchTestimonials = async () => {
  const data = await axios.get(`${SERVER_URL}/api/testimonials`);
  return data;
};
