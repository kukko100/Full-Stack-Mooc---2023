"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientsDB_1 = __importDefault(require("../data/patientsDB"));
const getEntries = () => {
    return patientsDB_1.default;
};
const getNonSensitiveEntries = () => {
    return patientsDB_1.default.map(({ id, name, dateOfBirth, gender }) => ({
        id,
        name,
        dateOfBirth,
        gender
    }));
};
const findById = (id) => {
    const entry = patientsDB_1.default.find(p => p.id === id);
    return entry;
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: Math.max(...patientsDB_1.default.map(d => d.id)) + 1 }, entry);
    patientsDB_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getEntries,
    addPatient,
    getNonSensitiveEntries,
    findById
};
