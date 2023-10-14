import { useEffect, useState } from 'react';
import { Diary } from "./types";
import diaryService from "./services/diaries";
import DiaryListPage from './components/diaryListPage';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    const fetchDiaryList = async () => {
      const fetchedDiaries = await diaryService.getAll();
      setDiaries(fetchedDiaries)
    }
    void fetchDiaryList();
  },[])


  return (
    <div className="App">
      <DiaryListPage diaries={diaries} setDiaries={setDiaries}/>
    </div>
  )
}

export default App
