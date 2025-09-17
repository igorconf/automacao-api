const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const app = require('../../app');
const transferService = require('../../service/transferService');

describe('Transfer Controller', () => {
    describe('POST /transfer', () => {
        it('Quando informo remetente e destinatário inexistente recebo 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "julio",
                    to: "priscila",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });

        it('Usando mocks: Quando informo remetente e destinatário inexistente recebo 400', async () => {
            // Mock apenas a função transfer do service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'));            

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "julio",
                    to: "priscila",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');

            sinon.restore();
        });

        it('Usando mocks: Quando informo valores válido eu tenho sucesso com 201 CREATED', async () => {
            // Mock apenas a função transfer do service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({
                from: "julio",
                to: "priscila",
                amount: 100,
                date: new Date().toISOString()
            });            

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "julio",
                    to: "priscila",
                    amount: 100
                });

            expect(resposta.status).to.equal(201);  
            expect(resposta.body).to.have.property("from", "julio");
            expect(resposta.body).to.have.property("to", "priscila");
            expect(resposta.body).to.have.property("amount", 100);
            expect(resposta.body).to.have.property("date");

            sinon.restore();
        });
    });
});