"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const entryService_1 = __importDefault(require("../services/entryService"));
// import utils from '../utils';
// import entryService from '../services/entryService';
const router = express_1.default.Router();
router.get('/', (_request, response) => {
    const entry = entryService_1.default.getAllEntries();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (entry) {
        response.send(entry);
    }
    else {
        response.send(404);
    }
});
router.get('/:id', (request, response) => {
    const patient = patientService_1.default.findById(String(request.params.id));
    if (patient) {
        response.send(patient.entries);
    }
    else {
        response.send(404);
    }
});
// router.post('/', (request, response) => {
//   try {
//     const newEntry = utils.toNewEntry(request.body.entry);
//     const addedEntry = entryService.addEntry(newEntry, request.body.patient);
//   } catch (error) {
//     console.log(error);
//   }
// });
exports.default = router;
