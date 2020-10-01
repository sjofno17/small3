const service = () => {

    const candies = require('../data.json').candies;
    const offers = require('../data.json').offers;
    const pinatas = require('../data.json').pinatas;

    /* --------------- CANDY --------------- */
    const getAllCandies = () => {
        return candies;
    };

    const createCandy = (candy) => {
        const newCandy = {...candy, id: (candies.sort((a, b) => b.id - a.id).find((x) => x) || {}).id || 1};
        candies.push(newCandy);
        return newCandy;
    };

    const getCandyById = (id) => {
        const candy = candies.filter(u => u.id == id);
        if(candy.length === 0) { return null}
        return candy[0];
    };

    /* --------------- OFFER --------------- */
    const getAllOffers = () => {
        return offers.map((e) => ({
            id: e.id,
            name: e.name,
            candies: Array.from(e.candies).map((candyId) => getCandyById(candyId))
        }));
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
        if(pinata.length == 0) { return null }
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
        const pinata = pinatas.find(u => u.id == id);
        if (pinata === null) {
            return null;
        }
        if (pinata.currentHits === maximumHits) {
            return 'BÚIÐ AÐ SPRENGJA';
        }
        pinata.currentHits++; //(If the hit was a success it should return a status code of 204)
        pinatas = [...pinatas.filter((e) => e.id !== id), pinata];
        //if it was the final blow than it should return a status code of 200 (OK) along with the surprise property
        //from the pinata as a string (the surprise will only be returned a single time)
        if(currenthits == maximumhits)
        {
            return true;
        }
        return false;


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