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
Object.defineProperty(exports, "__esModule", { value: true });
const findByCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=${code}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
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
exports.default = { findByCode };
