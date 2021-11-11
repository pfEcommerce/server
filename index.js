const axios = require('axios');
const e = require('express');

const { allData } = require ('./src/request/allRequests')

const server = require('./src/app.js');
const { conn } = require('./src/db.js');


// Syncing all the models at once.
conn.sync({ force: true }).then( async () => {
    await allData();
    server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
});