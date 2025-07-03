import { petsService, usersService } from "../services/index.js";
import mocks from "../utils/mocks.js";
import {logger} from "../utils/logger.js";


const mockingpets = async (req,res) => {
    let { cantidad } = req.query;
    if(!cantidad) cantidad = 100
    let pets = []
    try{
        for(let i = 0; i < cantidad; i++){
            pets.push(mocks.createpetMocks())
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets);
    }catch(error){
        logger.error(error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor al crear una mascota'
        })
        
    }
}

const mockingusers = async (req,res) => {
    let { cantidad } = req.query;
    if(!cantidad) cantidad = 50
    let users = [];
    try {
        for(let i = 0; i < cantidad; i++){
            users.push( await mocks.createUserMocks());
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    }catch(error){
        logger.error(error)
        res.setHeader('Content-Type', 'application/json')
        res.status(500).json({
            error: 'Error inesperado en el servidor al crear un usuario'
        })
    }
}

const generateData = async (req,res) => {
    let {users, pets } = req.body;

    try {
        const petsMocks = []
        const usersMocks = []

        for(let i = 0; i < users; i++){
            usersMocks.push( await mocks.createUserMocks());
        }

        for(let i = 0; i < pets; i++){
            petsMocks.push( await mocks.createpetMocks());
        }

        await Promise.all(usersMocks.map(async (user) => {
            return await usersService.create(user)
        }))

        await Promise.all(petsMocks.map(async (pet) => {
            return await petsService.create(pet)
        }))

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            success: true,
        });

    }catch(error){
        logger.error(error)
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