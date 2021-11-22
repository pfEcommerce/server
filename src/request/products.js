const server = require('express').Router();
const { Product } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');

const apiProduct = async () => {

    function getPrice() {
        return (Math.random() * (11 - 2) + 2).toFixed(2);
    };
    function getStock() {
        return Math.floor(Math.random() * (50 - 5) + 5);
    };

    const getDetails = async (e) => {
        const result = await axios.get(`https://api.rawg.io/api/games/${e.id}?key=${API_KEY}`);
        
        return result.data.description_raw
    }

    try {
        const api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
         const dataApi = [] 

         for (let i = 0; i < api.data.results.length; i++) {
            dataApi.push({
                name: api.data.results[i].name,
                released: api.data.results[i].released,
                image: api.data.results[i].background_image,
                categories: api.data.results[i].genres,
                price: getPrice(),
                stock: getStock(),
                idApi: api.data.results[i].id,
                platforms: api.data.results[i].platforms,
                imgs: api.data.results[i].short_screenshots,
                description: await getDetails(api.data.results[i])
            })
            
        } 
        

        /* onst dataApi = await api.data.results.map ( e => {
            return {
                name: e.name,
                released: e.released,
                image: e.background_image,
                categories: e.genres,
                price: getPrice(),
                stock: getStock(),
                idApi: e.id,
                description: 'Como se ha comentado, el código de la respuesta original tiene un fallo al hacer operaciones con coma flotante, y es que se pierden decimales. Podemos solventarlo viendo si el número de decimales que el número tiene es menor o igual que el número de posiciones que hay que a truncar.'
            };
        });  */
        dataApi.forEach(async e => {
            const producto = await Product.create({
                name: e.name,
                released: e.released,
                image: e.image,
                price: e.price,
                stock: e.stock,
                idApi: e.idApi,
                description: e.description,
                imgs:e.imgs,
                platforms: e.platforms
            });
        })
        
        return dataApi;
    } catch (err) {
        return console.log(err)
    }
};

module.exports = { apiProduct };