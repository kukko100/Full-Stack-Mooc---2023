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
    response.send(patientService_1.default.getEntries());
});
router.get('/:id', (request, response) => {
    const patient = patientService_1.default.findById(Number(request.params.id));
    if (patient) {
        response.send(patient);
    }
    else {
        response.send(404);
    }
});
router.post('/', (request, response) => {
    try {
        const newPatientEntry = (0, utils_1.default)(request.body);
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
