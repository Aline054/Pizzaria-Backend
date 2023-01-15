import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UseRequest{
    name: string;
    email:string;
    password:string;
}

class CreactUserService{
    async execute({name, email,password}: UseRequest){

       //verificar se ele enviou um email
       if(!email){
        throw new Error("Email incorrect")
       }
       //verificar se esse email ja esta cadastrado
       const userAlreadyExists = await prismaClient.user.findFirst({
        where:{
            email: email
        }
       })

       if(userAlreadyExists){
        throw new Error("User already exists")
       }

       const passwordHash =await hash(password, 8)


       const user = await prismaClient.user.create({
        data:{
            name: name,
            email:email,
            password: passwordHash,
        },
        select:{
            id:true,
            name:true,
            email:true,
            
        }
       })
       return user;
    }
}

export{ CreactUserService }