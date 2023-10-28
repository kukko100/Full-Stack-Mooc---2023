import patients from '../data/patientsDB';
import { NonSensitivePatient, PatientType, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid'; 

const getPatients = (): PatientType[] => {
  return patients;
};



const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): PatientType | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = ( entry: NewPatient ): PatientType => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuidv4(),
    ...entry
  };

  Object.values(newPatientEntry).forEach(value => {
      console.log(value);
  });

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const updatePatient = (id: string, updatedData: object) => {
  const index = patients.findIndex((patient) => patient.id === id);
  if (index === -1) {
    return null;
  }
  patients[index] = {
    ...patients[index],
    ...updatedData,
  };
  return patients[index];
};


export default {
  addPatient,
  getNonSensitiveEntries,
  findById,
  getPatients,
  updatePatient
};