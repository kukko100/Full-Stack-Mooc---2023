import entries from "../data/entriesDB";
import { Entry, NewEntry, Patient } from "../types";

import { v4 as uuidv4 } from 'uuid'; 

const baseUrl = 'https://localhost:3000/api';

const getAllEntries = () => {
  return entries;
};

// const getEntriesByPatientId = (id: string): Entry => {
//   const entries = entries.find(e => e.patientId === id);
//   return entries;
// };

const getEntries = async (id: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/patients/${id}`
    );

    if (!response.ok) {
      throw new Error('Network response wan not ok');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
    
  } catch (error) {
    return error;
  }
};

const addEntry = ( entry: NewEntry, patient: Patient ): Entry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newEntry = {
    id: uuidv4(),
    ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default { getEntries, addEntry, getAllEntries };