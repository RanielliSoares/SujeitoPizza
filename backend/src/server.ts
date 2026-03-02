import cors from 'cors';
import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes';//importa o arquivo de rotas

const app = express();
app.use(express.json());

app.use(cors());
app.use(router);//coloca que vamos usar o arquivo de rotas para lidar com as requisições
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof Error) {
        return res.status(400).json({
            error: error.message
        });
    }
    return res.status(500).json({
        error: "Erro Interno Server"
    });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

