const axios = require('axios');
const e = require('express');

const { allData } = require ('./src/request/allRequests');

const testUsers = require('./testUsers');
const testOrders = require('./testOrders');

const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const local = "http://localhost:3001";

const cargaUsers = async () => {
    const usuariosPromise = testUsers.map( async (e) => {
        const response = await axios.post(`${local}/users/login`, e)
    return response
    });
    Promise.all(usuariosPromise).then(() => {
        return console.log("Users cargados")
    });
};

const cargaOrders = async () => {
    const ordersPromise = testOrders.map( async (e) => {
        const response = await axios.post(`${local}/orders/${e.emailUserTest}`, e)
    return response
    });
    Promise.all(ordersPromise).then(() => {
        return console.log("Orders cargados")
    });
};



// Syncing all the models at once.
conn.sync({ force: true }).then( async () => {
    await allData();
    await cargaUsers();
    await cargaOrders();
    server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
});