"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object && 'entries' in object) {
        const newPatient = {
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
const toNewEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('incorrect or missing data');
    }
    if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'discharge' in object) {
        const newEntry = {
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
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(gender);
};
const isEntry = (entries) => {
    if (entries && typeof entries === 'object' && 'type' in entries) {
        return true;
    }
    return false;
};
const isDischarge = (discharge) => {
    if (discharge && typeof discharge === 'object' && 'criteria' in discharge) {
        return true;
    }
    return false;
};
const isStringArray = (array) => {
    return Array.isArray(array) && array.every(item => typeof item === 'string');
};
// const isHealthCheckRating = (healthCheckRating: unknown): healthCheckRating is HealthCheckRating => {
//   if (healthCheckRating && typeof healthCheckRating === 'object') {
//     return true;
//   }
//   return false;
// };
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const parseEntry = (entries) => {
    if (Array.isArray(entries) && entries.every(isEntry)) {
        return entries;
    }
    throw new Error('Incorrect or missing entry');
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing ssn');
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!diagnosisCodes || !isStringArray(diagnosisCodes)) {
        throw new Error('incorrect or missing diagnosis array');
    }
    return diagnosisCodes;
};
const parseDischarge = (discharge) => {
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
exports.default = { toNewPatient, toNewEntry };
