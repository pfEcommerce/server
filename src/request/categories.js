const server = require('express').Router();
const { Product, Category } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');

const apiCat = async () => {
    try {
        const api = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const apiData = await api.data.results.map ( e => {
            return {
                id: e.id,
                name: e.name,
                games: e.games
            };
        });
        apiData.forEach(async e => {
            await Category.create({
                idApi: e.id,
                name: e.name
            })
        });
        return apiData;
    } catch (err) {
        return console.log(err)
    };
};


module.exports = { apiCat };