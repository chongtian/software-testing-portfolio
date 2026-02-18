import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: path.join(path.resolve(__dirname), "../.env")});

export const BASE_URL = process.env.BASE_URL;
export const TEST_USER_USERNAME = process.env.TEST_USER_USERNAME;
export const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

export const LOGIN_URL = `${BASE_URL}/login`;

export const HOME_URL = `${BASE_URL}/home`;

export const localAuthDataFilePath: string = path.join(path.resolve(__dirname), "../.auth");

export const adminAuthDataFilePath: string = path.join(localAuthDataFilePath, "admin_user.json");

