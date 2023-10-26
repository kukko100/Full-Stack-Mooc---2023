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
const express_1 = __importDefault(require("express"));
const diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
const router = express_1.default.Router();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:code', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = request.params.code;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const diagnose = yield diagnoseService_1.default.findByCode(code);
        if (diagnose) {
            response.send(diagnose);
        }
        else {
            response.sendStatus(404);
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }
}));
exports.default = router;
