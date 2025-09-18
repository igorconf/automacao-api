const request = require('supertest');
const { expect } = require('chai');

describe('Transfer', () => {
    describe('POST /transfer', () => {
        it('Quando informo remetente e destinatário inexistente recebo 400', async () => {
            const resposta = await request("http://localhost:3000")
                .post('/transfer')
                .send({
                    from: "julio",
                    to: "priscila",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });
    });
});