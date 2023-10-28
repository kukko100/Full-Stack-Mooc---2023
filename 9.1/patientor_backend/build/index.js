"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_1 = __importDefault(require("./routes/patients"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const entries_1 = __importDefault(require("./routes/entries"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)(), express_1.default.json());
const PORT = 3000;
app.get('/ping', (_request, response) => {
    console.log('someone pinged here');
    response.send('pong');
});
app.use('/api/patients', patients_1.default);
app.use('/api/diagnoses', diagnoses_1.default);
app.use('/api/entries', entries_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
