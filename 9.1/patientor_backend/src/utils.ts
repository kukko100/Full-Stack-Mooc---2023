import { NewPatient, NewEntry, Discharge } from "./types";
import { Gender, Entry } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object && 'entries' in object ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSSN(object.ssn),
      entries: parseEntry(object.entries),
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing in new Patient');
};


const toNewEntry = (object: unknown): NewEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'discharge' in object) {
    const newEntry: NewEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      discharge: parseDischarge(object.discharge),
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing in new Entry');
};

// const toNewHealthCheckEntry = (object: unknown): NewHealthCheckEntry => {
//   if ( !object || typeof object !== 'object' ) {
//     throw new Error('incorrect or missing data');
//   }

//   if ('description' in object && 'date' in object && 'specialist' in object && 'healthCheckRating' && 'type' in object) {
//     const newEntry: NewHealthCheckEntry = {
//       description: parseDescription(object.description),
//       date: parseDate(object.date), 
//       specialist: parseSpecialist(object.specialist),
//       healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
//       type: parseType(object.type)

//     };
//     return newEntry;
//   }
//   throw new Error('Incorrect data: some fields are missing in new Entry');
// };

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const isEntry = (entries: unknown): entries is Entry => {
  if (entries && typeof entries === 'object' && 'type' in entries) {
    return true;
  }
  return false;
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  if (discharge && typeof discharge === 'object' && 'criteria' in discharge) {
    return true;
  }
  return false;
};

const isStringArray = (array: unknown): array is Array<string> => {
  return Array.isArray(array) && array.every(item => typeof item === 'string');
};

// const isHealthCheckRating = (healthCheckRating: unknown): healthCheckRating is HealthCheckRating => {
//   if (healthCheckRating && typeof healthCheckRating === 'object') {
//     return true;
//   }
//   return false;
// };

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseEntry = (entries: unknown): Entry[] => {
  if (Array.isArray(entries) && entries.every(isEntry)) {
    return entries;
  }
  throw new Error('Incorrect or missing entry');
};

const parseDescription = (description: unknown): string => {
  if(!description || !isString(description)) {
    throw new Error('Incorrect or missing ssn');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<string> => {
  if (!diagnosisCodes || !isStringArray(diagnosisCodes)) {
    throw new Error('incorrect or missing diagnosis array');
  }
  return diagnosisCodes;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('incorrect or missing discharge');
  }
  return discharge;
};

// const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
//   if (!healthCheckRating || !isHealthCheckRating(healthCheckRating) || isString(healthCheckRating)) {
//     throw new Error('incorrect or missing healthcheckRating');
//   }
//   return healthCheckRating;
// };

export default { toNewPatient, toNewEntry };