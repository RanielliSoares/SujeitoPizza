import multer from "multer";

export default {
    storage: multer.memoryStorage(), // Armazenamento em memória, os arquivos serão armazenados temporariamente na memória do servidor
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de tamanho do arquivo (5MB)
    },
    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true); // Aceitar o arquivo
        } else {
            cb(new Error("Tipo de arquivo não permitido"), false); // Rejeitar o arquivo
        }
    },
}
