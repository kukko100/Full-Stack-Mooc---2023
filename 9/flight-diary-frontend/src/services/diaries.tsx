import axios from "axios";
import { Diary, DiaryFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(
    `${apiBaseUrl}/api/diaries`
  );

  return data
}

const create = async (object: DiaryFormValues) => {
  const { data } = await axios.post<Diary>(
    `${apiBaseUrl}/api/diaries`,
    object
  );

  return data;
} 

export default {
  getAll, create
}
