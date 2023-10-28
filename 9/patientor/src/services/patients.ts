import axios from "axios";
import { Entry, EntryFormValues, Patient, PatientFormValues } from "../types";
import { v4 as uuidv4 } from 'uuid'; 
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/api/patients`
  );

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/api/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/api/patients`,
    object
  );

  return data;
};

const addEntryToPatient = async (object: EntryFormValues, id: string) => {
  const patient = await getPatient(id); // Get the patient object by ID from your API
  const newEntry = { ...object, id: uuidv4() }; // Create a new entry object
  let flag = false;

  // Append the new entry to the patient's entries array
  Object.values(newEntry).forEach(value => {
    if (!value) {
      if (value !== 0) {
        flag = true;
      }
      
    }
  });

  if (!flag) {
    patient.entries.push(newEntry);

  // Update the patient's data on the server
  const { data } = await axios.put<Entry>(
    `${apiBaseUrl}/api/patients/${id}`,
    patient
  );

  return data;
  }
  throw new Error("All fields need to be filled");
  
};

export default {
  getAll, create, getPatient, addEntryToPatient
};

