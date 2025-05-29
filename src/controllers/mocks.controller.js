import { petsService, usersService } from "../services/index.js";
import mocks from "../utils/mocks.js";


const mockingpets = async (req,res) => {
    let { cantidad, grabaDB } = req.query;
    if(!cantidad) cantidad = 100
    let pets = []
    try{
        for(let i = 0; i < cantidad; i++){
            pets.push(mocks.createpetMocks())
        }

        if(grabaDB){
            pets = await Promise.all(pets.map(async (pet) => {
                return await petsService.create(pet)
            }));
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets);
    }catch(error){
        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor al crear una mascota'
        })
        
    }
}

const mockingusers = async (req,res) => {
    let { cantidad, grabaDB } = req.query;
    if(!cantidad) cantidad = 50
    let users = [];
    try {
        for(let i = 0; i < cantidad; i++){
            users.push( await mocks.createUserMocks());
        }
        if(grabaDB){
            users = await Promise.all(users.map(async (user) => {
                return await usersService.create(user)
            }))
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    }catch(error){
        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        res.status(500).json({
            error: 'Error inesperado en el servidor al crear un usuario'
        })
    }
}

const generateData = async (req,res) => {
    let {users, pets, grabaDB } = req.body;

    try {
        await fetch(`http://localhost:8080/api/mocks/mockingpets?cantidad=${users}&grabaDB=${grabaDB}`);
        await fetch(`http://localhost:8080/api/mocks/mockingusers?cantidad=${pets}&grabaDB=${grabaDB}`);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            success: true,
        });

    }catch(error){
        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: "Error inesperado en el servidor al crear ambos objetos"
        })
    }
}

export default {
    mockingpets,
    mockingusers,
    generateData,
}