import patients from '../data/patientsDB';

import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender}) => ({
    id,
    name,
    dateOfBirth,
    gender
  }));
};

const findById = (id: number): PatientEntry | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: Math.max(...patients.map(d=> d.id)) + 1,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById
};