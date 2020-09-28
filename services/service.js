const service = () => {
    
    const candies = require('../data.json').candies;
    const offers = require('../data.json').offers;
    const pinatas = require('../data.json').pinatas;

    const getAllCandies = () => {
        return candies;
    };

    const createCandy = (candy) => {
        let highestId = 0;
        candies.forEach(u => { if(u.id > highestId) { highestId = u.id; } });
        candies.id = highestId + 1;
        candies.push(candy);
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

    const createPinata = (pinata) => {
        let highestId = 0;
        pinatas.forEach(u => { if(u.id > highestId) { highestId = u.id; } });
        pinatas.id = highestId + 1;
        pinatas.push(pinata);
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