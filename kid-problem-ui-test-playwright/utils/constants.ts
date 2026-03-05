import path from 'path';

export const BASE_URL = process.env.BASE_URL;
export const TEST_USER_USERNAME = process.env.TEST_USER_USERNAME;
export const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;
export const TEST_CHILD_USERNAME = process.env.TEST_CHILD_USERNAME;
export const TEST_CHILD_PASSWORD = process.env.TEST_CHILD_PASSWORD;

export const LOGIN_URL = `${BASE_URL}/login`;

export const HOME_URL = `${BASE_URL}/home`;

export const _LocalAuthDataFilePath: string = path.join(path.resolve(__dirname), "../.auth");

export const AdminAuthDataFilePath: string = path.join(_LocalAuthDataFilePath, "admin_user.json");

export const ChildAuthDataFilePath: string = path.join(_LocalAuthDataFilePath, "child_user.json");

