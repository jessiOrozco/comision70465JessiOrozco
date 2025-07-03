import supertest from 'supertest';
import {describe, it} from 'mocha';
import {expect} from 'chai';

import moongose, {isValidObjectId} from 'mongoose';
import {logger} from "../../src/utils/logger.js";
process.loadEnvFile("./.env")

try{
    moongose.connect(process.env.MONGO_URL_TEST);
}catch (error){
    logger.error("Error al conectar a base de datos", error)
    process.exit(1)
}

const requester = supertest('http://localhost:3000');

describe('Test Router Pets', async function() {
    this.timeout(10000);

    afterEach(async()=>{
        await moongose.connection.collection('Pets').deleteMany({specie: "test20250702"});
    })

    it('Si ejecuto la ruta /api/pets, retorna un objeto con una propiedad payload que es un array de mascotas ', async() => {
        let {status, body} = await requester.get("/api/pets")

        expect(body).to.has.property('payload')
        expect(Array.isArray(body.payload)).to.be.true
        if (Array.isArray(body.payload) && body.payload.length > 0){
            expect(body.payload[0]).to.has.property('_id')
            expect(isValidObjectId(body.payload[0]._id)).to.be.true
        }

    });

    it('Si ejecuto la ruta /api/pets, espero un status success ', async() => {
        let {status, body} = await requester.get("/api/pets")

        expect(body).to.has.property('status').and.to.be.eq('success')


    });
    it('Si ejecuto la ruta /api/pets, espero un status con valor 200 ', async() => {
        let {status} = await requester.get("/api/pets")
        expect(status).and.to.be.eq(200)
    });

    it('Si envio los datos de una mascota a la ruta /api/pets, con metodo POST graba en DB ', async() => {
        let petMock = {name: "Marshal", specie: "test20250702", birthDate: "2021-01-01"}

        let {body} = await requester.post("/api/pets").send(petMock)
        expect(body).to.has.property('payload')
        expect(body.payload).to.has.property('_id')
        expect(isValidObjectId(body.payload._id)).to.be.true
        expect(body.payload).to.has.property('name')
    });
    it("Si ejecuto la ruta /api/pets/withimage y le concateno una imagen creara en la bd un registro de la mascota con una imagen ", async() => {
        const petMock = {
            name: "Marshal",
            specie: "test20250702",
            birthDate: "2021-01-01"
        };

        const response = await requester
            .post('/api/pets/withimage')
            .attach('image', './test/public/img.png')
            .field('name', petMock.name)
            .field('specie', petMock.specie)
            .field('birthDate', petMock.birthDate);

        // Verificaciones
        expect(response.body).to.have.property('status', 'success');
        expect(response.body).to.have.property('payload');
        expect(response.body.payload).to.have.property('_id');
        expect(isValidObjectId(response.body.payload._id)).to.be.true;
        expect(response.body.payload).to.have.property('image');
        expect(response.body.payload.name).to.equal(petMock.name);
        expect(response.body.payload.specie).to.equal(petMock.specie);
    });


    it('Si ejecuto la ruta /api/pets/ con el método PUT, debe modificar la mascota existente', async () => {
        // 1. Primero creamos una mascota para tener un ID válido
        const newPetMock = {
            name: "Firulais",
            specie: "test20250702",
            birthDate: "2021-01-01"
        };


        const createResponse = await requester
            .post("/api/pets")
            .send(newPetMock);

        const petId = createResponse.body.payload._id;


        const updatePetMock = {
            name: "Marshal",
            specie: "test20250702Update",
            birthDate: "2021-01-01"
        };


        const {body} = await requester
            .put(`/api/pets/${petId}`)  // Usamos el ID en la URL
            .send(updatePetMock);


        expect(body).to.have.property('status', 'success');
        expect(body).to.have.property('message');
        expect(body.message).to.equal('pet updated');
    });

    it('Si ejecuto la ruta /api/pets con el metodo Delete debe eliminar la mascota existente', async() => {
        const newPetMock = {
            name: "Firulais",
            specie: "test20250702",
            birthDate: "2021-01-01"
        };


        const createResponse = await requester
            .post("/api/pets")
            .send(newPetMock);

        const petId = createResponse.body.payload._id;

        let {body} = await requester.delete(`/api/pets/${petId}`)
        expect(body).to.have.property('status', 'success');
        expect(body).to.have.property('message');
        expect(body.message).to.equal('pet deleted');


    });

})