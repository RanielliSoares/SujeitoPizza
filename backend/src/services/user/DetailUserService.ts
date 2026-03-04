import prismaClient from "../../prisma/index";

class DetailUserService {
    async execute(user_id: string) {
        try {
            const user = await prismaClient.user.findUnique({
                where: { id: user_id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            });
            if (!user) {
                throw new Error("Usuario não encontrado!")
            }
            return user;
        } catch (err) {
            throw new Error("Erro ao buscar usuário")
        }


    }
}

export { DetailUserService }