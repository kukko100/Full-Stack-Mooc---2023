import { PatientEntry } from "../types";
import toNewPatientEntry from "../utils";

const data = [
  {
    "id": 1,
    "name": "Testi Tatu",
    "dateOfBirth": "1992-12-12",
    "gender": "male",
    "occupation": "Student"
  },
  {
    "id": 2,
    "name": "Pupu Pusse",
    "dateOfBirth": "1994-02-01",
    "gender": "female",
    "occupation": "Office worker"
  },
  {
    "id": 3,
    "name": "Puuha Pete",
    "dateOfBirth": "1991-08-03",
    "gender": "male",
    "occupation": "Construction worker"
  },
  {
    "id": 4,
    "name": "Monni Kissa",
    "dateOfBirth": "2010-02-11",
    "gender": "other",
    "occupation": "Cat"
  }
];

const patientEntries: PatientEntry[] = data.map(obj => {
  const object = toNewPatientEntry(obj) as PatientEntry;
  object.id = obj.id;
  return object;
});

export default patientEntries;
