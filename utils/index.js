const mongoose = require('mongoose');
 const jwt = require('jsonwebtoken');

/**
 * Convierte un texto a formato camelcase
 * @param { String } texto a convertir
 */
const camelCase = text =>{
    text = text.toLowerCase();
    return text.replace(/\b\w/g, (m) => m.toUpperCase());
}

/**
 *
 * @param {*} res
 * @param { Object } json
 * @param { int } status
 */
const respond = (res, json, status) => {
  res.format({
    json: () => {
      let code = status || 200;
      res.status(code).json(json);
    }
  });
}
 
module.exports = {
    respond,
    camelCase
}
