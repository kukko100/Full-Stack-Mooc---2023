"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkIfFieldEmpty = (type) => {
    if (type === 'HealthCheck') {
        console.log("It is healthCheck");
        // if (entry.description === '') {
        //   console.log("asdf");
        // }
    }
    else if (type === 'Hospital') {
        console.log("It is Hospital");
    }
    else if (type === 'OccupationalHealthcare') {
        console.log("It is Occupational");
    }
};
exports.default = checkIfFieldEmpty;
