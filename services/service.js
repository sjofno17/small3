const service = () => {
    
    const candies = require('../data.json').candies;
    const offers = require('../data.json').offers;
    const pinatas = require('../data.json').pinatas;


    /* --------------- CANDY --------------- */
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
        if(candy.length === 0) { return -1 }
        return candy[0];
    };

    /* --------------- OFFER --------------- */
    const getAllOffers = () => {
        return offers;
    };

    /* --------------- PINATA --------------- */
    //should contain all properties excluding surprise - check    (and currenthits needs to be added???)
    const getAllPinatas = () => {
        const newPinatas = [];
        const getAll = pinatas;
        getAll.map(u => {
            let newPinata = {
                id: u.id,
                name: u.name,
                maximumHits: u.maximumHits//,
                //currentHits: currentHits  
            };
                newPinatas.push(newPinata);
            newPinata = null;
        });
        return newPinatas;
    };

    //should contain all properties excluding surprise - check
    const getPinataById = (id) => {
        const pinata = getAllPinatas().filter(u => u.id == id);
        if(pinata.length == 0) { return -1 }
        return pinata;
    };

    const createPinata = (pinata) => {
        let highestId = 0;
        pinatas.forEach(u => { if(u.id > highestId) { highestId = u.id; } });
        pinatas.id = highestId + 1;
        pinatas.push(pinata);
    };

    const hitPinata = (id, pinata) => {
        
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