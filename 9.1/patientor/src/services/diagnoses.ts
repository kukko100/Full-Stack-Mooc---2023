import axios from "axios";
import { apiBaseUrl } from "../constants";


const getDiagnose = async (code: string) => {
  const { data } = await axios.get(`${apiBaseUrl}/api/diagnoses/${code}`);
  return data;
};

export default {
  getDiagnose
};