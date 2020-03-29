const express = require('express');

const { celebrate, Joi, Segments } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();
/*
* Query Params: Parâmetros nomeados enviados na rota após "?" (filtro, paginação)
* Route Params: Parâmetros utilizados para identificar recursos
* Request body: Corpo da requisição, utilizado para criar ou alterar recursos.
*/

// SESSION CREATE
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}), SessionController.create);

// PROFILE INDEX
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required()
  }).unknown()
}), ProfileController.index);

// ONG INDEX
routes.get('/ongs', OngController.index);

// ONG CREATE
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

// INCIDENT INDEX
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), IncidentController.index);

// INCIDENT CREATE
routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
  })
}), IncidentController.create);

// INCIDENT DELETE
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), IncidentController.delete);

module.exports = routes;