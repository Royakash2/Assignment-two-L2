import dotenv from 'dotenv'
dotenv.config();
export default {
    port:process.env.PORT,
    DB_URL:process.env.DATABASE_URL
}