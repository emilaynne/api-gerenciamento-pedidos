const request = require('supertest');
const app = require('../src/app');

describe('Testes da API de Pedidos', () => {
  let pedidoId;

  it('Deve criar um pedido com sucesso (201)', async () => {
    const response = await request(app)
      .post('/pedidos')
      .send({ cliente: "Carlos Silva", tipo: "entrega", valor: 350, prioridade: "normal" });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    pedidoId = response.body.id;
  });

  it('Deve retornar erro 400 ao enviar dados inválidos', async () => {
    const response = await request(app)
      .post('/pedidos')
      .send({ cliente: "", tipo: "invalido", valor: -10, prioridade: "normal" });
    
    expect(response.status).toBe(400);
  });

  it('Deve listar os pedidos (200)', async () => {
    const response = await request(app).get('/pedidos');
    expect(response.status).toBe(200);
  });

  it('Deve consultar um pedido existente pelo ID (200)', async () => {
    const response = await request(app).get(`/pedidos/${pedidoId}`);
    expect(response.status).toBe(200);
  });

  it('Deve retornar 404 para um ID inexistente', async () => {
    const response = await request(app).get('/pedidos/9999');
    expect(response.status).toBe(404);
  });

  it('Deve atualizar o status do pedido com sucesso (200)', async () => {
    const response = await request(app)
      .patch(`/pedidos/${pedidoId}/status`)
      .send({ status: "em_preparacao" });
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("em_preparacao");
  });
});