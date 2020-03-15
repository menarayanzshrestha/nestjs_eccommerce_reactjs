import 'dotenv/config';
export const app = `http://localhost:${process.env.PORT}/v1`;
export const database = `${process.env.MONGO_URL_TEST}`;