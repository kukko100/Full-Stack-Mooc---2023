"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_request, response) => {
    response.send(patientService_1.default.getPatients());
});
router.get('/:id', (request, response) => {
    const patient = patientService_1.default.findById(String(request.params.id));
    if (patient) {
        response.send(patient);
    }
    else {
        response.send(404);
    }
});
router.put('/:id', (request, response) => {
    const id = request.params.id;
    const updatedPatient = utils_1.default.toNewPatient(request.body);
    const entries = request.body.entries;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    entries.map((e) => {
        Object.values(e).forEach(value => {
            if (value === '') {
                response.status(422).json({ error: 'Incorrect data entry, check that all fields are filled' });
                return;
            }
        });
        console.log("---");
    });
    const updatedPatientData = patientService_1.default.updatePatient(id, updatedPatient);
    if (updatedPatientData) {
        response.json(updatedPatientData);
    }
    else {
        response.status(404).json({ error: 'Patient not found' });
    }
});
router.post('/', (request, response) => {
    try {
        const newPatientEntry = utils_1.default.toNewPatient(request.body);
        const addedEntry = patientService_1.default.addPatient(newPatientEntry);
        response.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        response.status(400).send(errorMessage);
    }
});
exports.default = router;
