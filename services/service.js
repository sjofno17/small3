const service = () => {
    
    const candies = require('../data.json').candies;
    const offers = require('../data.json').offers;
    const pinatas = require('../data.json').pinatas;

    /* --------------- CANDY --------------- */
    const getAllCandies = () => {
        return candies;
    };

    //hér er ein lei til að gera þetta create
    const createCandy = (candy) => {
        let highestId = 0;
        candies.forEach(u => { if(u.id > highestId) { highestId = u.id; } } );
        candy.id = highestId + 1;
        candies.push(candy);
        return candy;
    };

    const getCandyById = (id) => {
        const candy = candies.filter(u => u.id == id);
        if(candy.length === 0) { return -1 }
        return candy[0];
    };

    /* --------------- OFFER --------------- */
    const getAllOffers = () => {
        let getOffers = [];
        offers.forEach(u => {
            getOffers.push({
                id: u.id,
                name: u.name,
                candies: Array.from(u.candies)
            }); //hér sækir hann bara id á candy í array
        });
        getOffers.forEach(u => {
            u.candies.forEach((candy, i) => {
                u.candies[i] = getCandyById(candy);
            });
        });
        return getOffers;
    };

    /* --------------- PINATA --------------- */
    //should contain all properties excluding surprise - check  
    const getAllPinatas = () => {
        let getPinatas = [];
        pinatas.forEach(u => {
            getPinatas.push({
                id: u.id,
                name: u.name,
                maximumHits: u.maximumHits,
                currentHits: u.currentHits
            });
        });
        return getPinatas;
    };

    //should contain all properties excluding surprise - check
    const getPinataById = (id) => {
        const pinata = getAllPinatas().filter(u => u.id == id);
        if(pinata.length == 0) { return -1 }
        return pinata;
    };

    //fæ bara nýja ID til að birtast í postman
    const createPinata = (pinata) => {
        /*let highestId = 0;
        pinatas.forEach(u => { if(u.id > highestId) { highestId = u.id; } }); 
        pinata.id = highestId + 1;
        pinatas.push(pinata);
        return pinata;*/
        const newPinata = {
            id: pinatas.length +1,
            name: pinata.name,
            surprise: pinata.surprise,
            maximumHits: pinata.maximumHits
        };
        pinatas.push(newPinata);
        return newPinata;
    };

    const hitPinata = (id) => {
        const pinata = pinatas.filter(u => u.id == id);
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