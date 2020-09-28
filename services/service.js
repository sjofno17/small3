
const candies = require('../data.json').candies;
const offers = require('../data.json').offers;
const pinatas = require('../data.json').pinatas;

const service = () => {

    const getAllCandies = () => {
        return candies;
    };

    const createCandy = () => {
        
    };

    const getCandyById = (id) => {
        const candy = candies.filter(u => u.id == id);
        if(candy.length == 0) { return -1 }
        return candy[0];
    };

    const getAllOffers = () => {
        return offers;
    };

    const getAllPinatas = () => {
        return pinatas;
    };

    const getPinataById = (id) => {
        const pinata = pinatas.filter(u => u.id == id);
        if(pinata.length == 0) { return -1 }
        return pinata[0];
    };

    const createPinata = () => {
        
    };

    const hitPinata = (id) => {
        
    };

    return {
        getAllCandies,
        createCandy,
        getCandyById,
        getAllOffers,
        getAllPinatas,
        getPinataById,
        createPinata,
        hitPinata
    };
};

module.exports = service();