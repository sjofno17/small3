
const candies = require('../data.json').candies;
const offers = require('../data.json').offers;
const pinatas = require('../data.json').pinatas;

const service = () => {

    const getAllCandies = () => {
        return candies;
    };

    const createCandy = () => {
        
    };

    const getCandyById = () => {
        
    };

    const getAllOffers = () => {
        return offers;
    };

    const getAllPinatas = () => {
        return pinatas;
    };

    const getPinataById = () => {
        
    };

    const getCandyById = () => {
        
    };

    const createPinata = () => {
        
    };


    return {
        getAllCandies,
        createCandy,
        getCandyById,
        getAllOffers,
        getAllPinatas,
        getPinataById,
        createPinata,
        getPinataByIdHit // what to call this?
    };


};




module.exports = service();