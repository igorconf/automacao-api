const request = require('supertest');
const { expect } = require('chai');

before(async () => {
  await request("http://localhost:3000")
    .post('/users/register')
    .send({ 
        username: "julio",
        password: "123456"
    });

  const respostaLogin = await request("http://localhost:3000")
    .post('/users/login')
    .send({
        username: "julio", 
        password: "123456"
    });

  token = respostaLogin.body.token;
});

describe('Transfer', () => {
    describe('POST /transfer', () => {
        it('Quando informo remetente e destinatário inexistente recebo 400', async () => {         
            const resposta = await request("http://localhost:3000")
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "julio",
                    to: "jose",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });
    });
});