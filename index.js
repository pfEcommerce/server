const axios = require('axios');
const e = require('express');

const { allData } = require ('./src/request/allRequests');

const testUsers = require('./testUsers');
const testOrders = require('./testOrders');

const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const dotenv = require ('dotenv');
dotenv.config();

/* if(process.env.PORT == 3001){ */
    /* var local = "http://localhost:3001"; */
  /* }else{
    local = "https://scientiapfdeploy.herokuapp.com";
  } */

const cargaUsers = async () => {
    try {
        const usuariosPromise = testUsers.map( async (e) => {
            const response = await axios.post(`http://localhost:3001/users/login`, e)
        return response
        });
        Promise.all(usuariosPromise).then(() => {
            return console.log("Users cargados")
        });
    } catch (error) {
        console.log(error)
    }

};

const cargaOrders = async () => {
    try {
        const ordersPromise = testOrders.map( async (e) => {
            const response = await axios.post(`http://localhost:3001/orders/${e.emailUserTest}`, e)
        return response
        });
        Promise.all(ordersPromise).then(() => {
            return console.log("Orders cargados")
        });
    } catch (error) {
        console.log(error)
    }

};

const allCharges = async  () => {
    await allData();
    await cargaUsers();
    setTimeout(cargaOrders, 1000, "orders");
};


// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
    await allCharges();
    server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });