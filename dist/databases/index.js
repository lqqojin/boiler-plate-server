"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodbConnection = void 0;
const _config_1 = require("../config");
exports.mongodbConnection = `mongodb://${_config_1.DB_USERNAME}:${_config_1.DB_PASSWORD}@${_config_1.DB_HOST}:${_config_1.DB_PORT}/${_config_1.DB_DATABASE}?connectTimeoutMS=1000&authSource=${_config_1.DB_DATABASE}`;
// 'mongodb://10.1.14.142:27017,10.1.14.155:37017/isacbot_db_admin?replicaSet=rs0&readPreference=secondaryPreferred&maxStalenessSeconds=120';
