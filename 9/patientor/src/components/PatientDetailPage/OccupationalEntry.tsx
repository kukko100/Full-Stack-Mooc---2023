import React, { useState, useEffect } from 'react';
import diagnoseService from '../../services/diagnoses';
import { OccupationalHealthcare } from '../../types';
import WorkIcon from '@mui/icons-material/Work';
import defaultStyle from './entryStyle';

interface Props {
  icdCodes: string[] | undefined;
  entry: OccupationalHealthcare;
}

const OccupationalEntry: React.FC<Props> = ({ icdCodes, entry }) => {
  const [diagnoses, setDiagnoses] = useState<string[]>([]);

  useEffect(() => {
    if (icdCodes) {
      Promise.all(icdCodes.map(code => diagnoseService.getDiagnose(code)))
        .then(diagnosesData => {
          const extractedDiagnoses = diagnosesData.map(data => data[3]);
          setDiagnoses(extractedDiagnoses);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [icdCodes]);

  const categoryIcon = <WorkIcon/>;

  return (
    <dl style={defaultStyle}>
      <dt>{entry.date} {categoryIcon} {entry.employerName}</dt>
      <dt>{entry.description}</dt>
      <dt>diagnose by {entry.specialist}</dt>
      {diagnoses.length > 0 && diagnoses[0][0] && diagnoses[0][1] &&(
        <dt>
          {diagnoses.map((diagnose, index) => (
            <div key={index}>{diagnose[0][0]} {diagnose[0][1]}</div>
          ))}
        </dt>
      )}
    </dl>
  );
};

export default OccupationalEntry;