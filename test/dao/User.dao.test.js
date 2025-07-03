import  UsersDao from '../../src/dao/Users.dao.js';
import { describe, it } from 'mocha';
import Assert from 'assert';
import mongoose, {isValidObjectId} from 'mongoose';

import {expect, should} from 'chai'

process.loadEnvFile("./.env")

try{
    const connection = await mongoose.connect(process.env.MONGO_URL_TEST);
}catch(e){
    console.log("Error al conectar a BD")
}

const assert = Assert.strict;

const usersDao = new UsersDao();

//let usuarios = await UsersDao.get();

describe('Pruebas al DAO de Users', function(){
    this.timeout(10000);

    after(async()=>{
        await mongoose.connection.collection('users').deleteMany({email: "test@test.com"});
    })

    // before after
    // beforeEach() afterEach()

    it("El dao, con su metodo get, debe retornar un array de users", async() =>{
        let resultado = await usersDao.get();
        assert.equal(Array.isArray(resultado), true);
        if(Array.isArray(resultado) && resultado.length > 0){
            expect(resultado[0]).to.be.true
            expect(resultado[0].email).to.be.true
            expect(resultado[0].first_name).to.be.true
        }
    })

    it('El dao con su metodo save, graba en BD el usuario que le enviemos como argumento', async() => {
        const userMock = {
            first_name: 'test',
            email: 'test@test.com',
            last_name: 'test',
            password: '123',
        }

        let resultado = await usersDao.save(userMock)

        expect(resultado._id).to.be.ok
        expect(isValidObjectId(resultado._id)).to.be.true
        expect(resultado).to.has.property('email').and.to.be.eq(userMock.email)
        expect(resultado).to.has.property('first_name').and.to.be.eq(userMock.first_name)

        let consultaDB = await mongoose.connection.collection('users').findOne({email: userMock.email})
        expect(consultaDB._id).to.be.ok
        expect(resultado).to.has.property('email').to.be.eq(consultaDB.email)
    });

})