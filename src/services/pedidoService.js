let pedidos = [];
let nextId = 1;

const tiposPermitidos = ['entrega', 'retirada', 'balcao'];
const prioridadesPermitidas = ['baixa', 'normal', 'alta', 'urgente'];
const statusPermitidos = ['recebido', 'em_preparacao', 'enviado', 'entregue', 'cancelado'];

const criarPedido = (dados) => {
  const { cliente, tipo, valor, prioridade } = dados;

  if (!cliente || typeof cliente !== 'string' || cliente.trim() === '') {
    const error = new Error("O campo 'cliente' é obrigatório e não pode estar vazio.");
    error.status = 400;
    throw error;
  }

  if (valor === undefined || typeof valor !== 'number' || valor <= 0) {
    const error = new Error("O campo 'valor' deve ser numérico e maior que zero.");
    error.status = 400;
    throw error;
  }

  if (!tipo || !tiposPermitidos.includes(tipo)) {
    const error = new Error(`Tipo inválido. Tipos permitidos: ${tiposPermitidos.join(', ')}`);
    error.status = 400;
    throw error;
  }

  if (!prioridade || !prioridadesPermitidas.includes(prioridade)) {
    const error = new Error(`Prioridade inválida. Prioridades permitidas: ${prioridadesPermitidas.join(', ')}`);
    error.status = 400;
    throw error;
  }

  const novoPedido = {
    id: nextId++,
    cliente: cliente.trim(),
    tipo,
    valor,
    prioridade,
    status: 'recebido'
  };

  pedidos.push(novoPedido);
  return novoPedido;
};

const listarPedidos = () => pedidos;

const buscarPedidoPorId = (id) => {
  const pedidoId = Number(id);
  const pedido = pedidos.find(p => p.id === pedidoId);
  if (!pedido) {
    const error = new Error("Pedido não encontrado.");
    error.status = 404;
    throw error;
  }
  return pedido;
};

const atualizarStatusPedido = (id, novoStatus) => {
  const pedido = buscarPedidoPorId(id);
  if (!novoStatus || !statusPermitidos.includes(novoStatus)) {
    const error = new Error(`Status inválido. Status permitidos: ${statusPermitidos.join(', ')}`);
    error.status = 400;
    throw error;
  }
  pedido.status = novoStatus;
  return pedido;
};

module.exports = { criarPedido, listarPedidos, buscarPedidoPorId, atualizarStatusPedido };