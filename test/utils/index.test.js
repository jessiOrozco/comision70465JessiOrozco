import { createHash} from "../../src/utils/index.js";
import Assert from 'assert'

import {expect, should} from 'chai'

import {describe, it} from 'mocha'

const assert = Assert.strict;

describe('Test funcion hash usando chai', ()=> {
    it('Si mando un dato en txt plano retorna algo diferente ', async() => {
        let pass = '123'
        let resultado = await createHash('123')

        expect(pass).not.to.be.eq(resultado)

    });
    it('Si mando un dato en txt plano retorna algo diferente ', async() => {
        let pass = '123'
        let resultado = await createHash('123')

        expect(pass).not.to.be.eq(resultado)

        //assert.notEqual(pass, resultado)

    });
})