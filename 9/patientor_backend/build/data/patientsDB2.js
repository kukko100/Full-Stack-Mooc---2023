"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const patients = [
    {
        id: 'd2773336-f723-11e9-8f0b-362b9e155667',
        name: 'John McClane',
        dateOfBirth: '1986-07-09',
        ssn: '090786-122X',
        gender: types_1.Gender.Male,
        occupation: 'New york city cop',
        entries: [
            {
                id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
                date: '2015-01-02',
                type: 'Hospital',
                specialist: 'MD House',
                diagnosisCodes: ['S62.5'],
                description: "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
                discharge: {
                    date: '2015-01-16',
                    criteria: 'Thumb has healed.',
                },
            },
        ],
    }
];
exports.default = patients;
