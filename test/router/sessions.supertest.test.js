import supertest from 'supertest';
import {describe, it} from 'mocha';
import {expect} from 'chai';

import moongose, {isValidObjectId} from 'mongoose';
import {logger} from "../../src/utils/logger.js";
import userModel from "../../src/dao/models/User.js";
process.loadEnvFile("./.env")

try{
    moongose.connect(process.env.MONGO_URL_TEST);
}catch (error){
    logger.error("Error al conectar a base de datos", error)
    process.exit(1)
}

const requester = supertest('http://localhost:3000');

describe('Prueba Sessions', async function() {
    this.timeout(10000);

    this.userMock = {
        first_name: 'test',
        last_name: 'test',
        email: "test@test.com",
        password: '123'

    }

    after(async() => {
        userModel.deleteMany({email: "test@test.com"})
    })

    it('Si ejectuo api/sessions/register, metodo POST y envio un usuario correcto y lo da de alta en BD ', async() => {
        let {body} = await requester.post("/api/sessions/register").send(this.userMock)
        expect(body).to.has.property('payload')
        expect(isValidObjectId(body.payload)).to.be.true
    });

    it('Si ejectuo api/sessions/login, metodo POST y envio un usuario ya registrado regresara una cookie ', async() => {
        let {headers} = await requester.post("/api/sessions/login").send(this.userMock)
        expect(headers).to.has.property('set-cookie')
        let cookie = headers['set-cookie'][0]

        let nombreCookie = cookie.split('=')[0]

        expect(nombreCookie).to.be.eq('coderCookie')

    });

})