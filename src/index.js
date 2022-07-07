import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import productsRouter from './routes/productsRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(productsRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));