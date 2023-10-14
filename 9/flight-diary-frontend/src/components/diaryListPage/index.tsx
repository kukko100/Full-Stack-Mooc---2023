import DiaryList from "../diaryList";
import DiaryForm from "../diaryForm";
import { Diary, DiaryFormValues } from "../../types";
import diaryService from "../../services/diaries";
import axios from 'axios';

interface Props {
  diaries : Diary[]
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}

const DiaryListPage = ({ diaries, setDiaries } : Props) => {

  const submitNewDiary = async (values: DiaryFormValues) => {
    try {
      const diary = await diaryService.create(values);
      setDiaries(diaries.concat(diary));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
        } else {
          console.log("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
      }
    }
  };
  
  return (
    <div className="App">
      <DiaryForm submitNewDiary={submitNewDiary}/>
      <DiaryList diaries={diaries}/>
    </div>
  )
}

export default DiaryListPage