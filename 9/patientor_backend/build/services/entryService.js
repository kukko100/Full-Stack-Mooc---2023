"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entriesDB_1 = __importDefault(require("../data/entriesDB"));
const uuid_1 = require("uuid");
const baseUrl = 'https://localhost:3000/api';
const getAllEntries = () => {
    return entriesDB_1.default;
};
// const getEntriesByPatientId = (id: string): Entry => {
//   const entries = entries.find(e => e.patientId === id);
//   return entries;
// };
const getEntries = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseUrl}/patients/${id}`);
        if (!response.ok) {
            throw new Error('Network response wan not ok');
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = yield response.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data;
    }
    catch (error) {
        return error;
    }
});
const addEntry = (entry, patient) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry = Object.assign({ id: (0, uuid_1.v4)() }, entry);
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = { getEntries, addEntry, getAllEntries };
