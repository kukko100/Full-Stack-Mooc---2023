import React, { useState, useEffect } from 'react';
import diagnoseService from '../../services/diagnoses';
import defaultStyle from './entryStyle';
import { Hospital } from '../../types';
import { MedicalServices } from "@mui/icons-material";

interface Props {
  icdCodes: string[] | undefined;
  entry: Hospital;
}

const HospitalEntry: React.FC<Props> = ({ icdCodes, entry }) => {
  const [diagnoses, setDiagnoses] = useState<string[]>([]);

  useEffect(() => {
    if (icdCodes) {
      // Fetch and set the diagnoses when the component mounts
      Promise.all(icdCodes.map(code => diagnoseService.getDiagnose(code)))
        .then(diagnosesData => {
          // Extract the relevant data from the responses
          const extractedDiagnoses = diagnosesData.map(data => data[3]);
          setDiagnoses(extractedDiagnoses);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [icdCodes]);

  const categoryIcon = <MedicalServices/>;

  return (
    <dl style={defaultStyle}>
      <dt>{entry.date} {categoryIcon}</dt>
      <dt>{entry.description}</dt>
      {diagnoses.length > 0 && diagnoses[0][0] && diagnoses[0][1] &&(
        <dt>
          {diagnoses.map((diagnose, index) => (
            <div key={index}>{diagnose[0][0]} {diagnose[0][1]}</div>
          ))}
        </dt>
      )}
      <dt>Diagnose by {entry.specialist}</dt>
    </dl>
  );
};

export default HospitalEntry;
