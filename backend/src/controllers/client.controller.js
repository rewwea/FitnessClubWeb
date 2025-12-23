import clientService from '../services/client.service.js'

const create = async (req, res) => {
  console.log('[CLIENT CONTROLLER] POST /clients');

  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    console.error('[CLIENT CONTROLLER] error:', error.message);
    res.status(400).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  console.log('[CLIENT CONTROLLER] GET /clients');

  try {
    const clients = await clientService.getAllClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  console.log('[CLIENT CONTROLLER] GET /clients/:id');

  try {
    const client = await clientService.getClientById(req.params.id);
    res.json(client);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const update = async (req, res) => {
  console.log('[CLIENT CONTROLLER] PUT /clients/:id');

  try {
    const client = await clientService.updateClient(
      req.params.id,
      req.body
    );
    res.json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  console.log('[CLIENT CONTROLLER] DELETE /clients/:id');

  try {
    await clientService.deleteClient(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  create,
  getAll,
  getById,
  update,
  remove
};