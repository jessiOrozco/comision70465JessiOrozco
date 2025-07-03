import UserDTO from "../../src/dto/User.dto.js";
import {expect} from 'chai'
import {describe, it} from 'mocha'

describe("pruebas DTO", () => {

    // after before


        describe("Pruebas DTO User", () => {

            it('Si envio un usuario con last name y firstname retorna un usuario con name (concatenacion de nombre) ', () => {
                let userMock = {
                    first_name:'test', last_name:'test', email:'test@test.com', password:'123'
                }
                let resultado = UserDTO.getUserTokenFrom(userMock)

                expect(resultado).to.has.property("name").to.be.eq(`${userMock.first_name} ${userMock.last_name}`)
            });

        })


        describe("Pruebas DTO Pet", () => {
            it('should ', () => {
                expect(1).to.be.eq(1)
            });


        })
    }
)