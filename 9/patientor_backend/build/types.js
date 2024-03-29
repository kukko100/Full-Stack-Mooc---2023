"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.HealthCheckRating = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Other"] = "other";
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender || (exports.Gender = Gender = {}));
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating || (exports.HealthCheckRating = HealthCheckRating = {}));
var Type;
(function (Type) {
    Type["Hospital"] = "Hospital";
    Type["OccupationalHealthcare"] = "OccupationalHealthcare";
    Type["HealthCheck"] = "HealthCheck";
})(Type || (exports.Type = Type = {}));
