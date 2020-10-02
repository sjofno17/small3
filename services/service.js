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
            });
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

    const createPinata = (pinata) => {
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
        pinata.currentHits++; //(If the hit was a success it should return a status code of 204)

        
        //if it was the final blow than it should return a status code of 200 (OK) along with the surprise property 
        //from the pinata as a string (the surprise will only be returned a single time) 
        if(currenthits == maximumhits)
        {

        }  
        

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