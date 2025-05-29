import {fakerES_MX as fa} from '@faker-js/faker'
import Pet from "../dao/Pets.dao.js";
import {createHash} from "./index.js";


const createpetMocks = () => {


    let name= fa.person.firstName()
    let specie= fa.animal.type()
    let adopted = false
    let owner = null;
    let birthDate = fa.date.past({years: 15})


    return {
        name,
        specie,
        adopted,
        owner,
        birthDate
    }
}

const createUserMocks = async () => {
    let first_name= fa.person.firstName()
    let last_name= fa.person.lastName()
    let email = fa.internet.email()
    let role = fa.helpers.arrayElement(["admin", "user"])
    let password = await createHash("Coder123")
    let pets = []

    return {
        first_name,
        last_name,
        email,
        role,
        password,
        pets
    }
}

export default {
    createpetMocks,
    createUserMocks,
}