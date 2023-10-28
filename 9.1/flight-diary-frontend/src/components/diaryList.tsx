import { Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';

import { Diary } from "../types"

interface Props {
  diaries : Diary[]
}

const DiaryList = ({ diaries } : Props) => {
  return (
    <div>
      
      <Table>
        <TableHead>
          <h2>Diary entries</h2>
          <TableRow>
            <TableCell><h4>Date</h4></TableCell>
            <TableCell><h4>Weather</h4></TableCell>
            <TableCell><h4>Visibility</h4></TableCell>
            <TableCell><h4>Comment</h4></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(diaries).map((diary: Diary) => (
            <TableRow key={diary.id}>
              <TableCell>{diary.date}</TableCell>
              <TableCell>{diary.weather}</TableCell>
              <TableCell>{diary.visibility}</TableCell>
              <TableCell>{diary.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    
  )
}

export default DiaryList