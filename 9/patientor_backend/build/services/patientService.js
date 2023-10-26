"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientsDB2_1 = __importDefault(require("../data/patientsDB2"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patientsDB2_1.default;
};
const getNonSensitiveEntries = () => {
    return patientsDB2_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const findById = (id) => {
    const patient = patientsDB2_1.default.find(p => p.id === id);
    return patient;
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: (0, uuid_1.v4)() }, entry);
    patientsDB2_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const updatePatient = (id, updatedData) => {
    const index = patientsDB2_1.default.findIndex((patient) => patient.id === id);
    if (index === -1) {
        return null;
    }
    patientsDB2_1.default[index] = Object.assign(Object.assign({}, patientsDB2_1.default[index]), updatedData);
    return patientsDB2_1.default[index];
};
exports.default = {
    addPatient,
    getNonSensitiveEntries,
    findById,
    getPatients,
    updatePatient
};
