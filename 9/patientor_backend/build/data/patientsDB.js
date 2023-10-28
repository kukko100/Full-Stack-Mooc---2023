"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils"));
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
const patientEntries = data.map(obj => {
    const object = (0, utils_1.default)(obj);
    object.id = obj.id;
    return object;
});
exports.default = patientEntries;
