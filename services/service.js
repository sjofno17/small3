const service = () => {
  const candies = require("../data.json").candies;
  const offers = require("../data.json").offers;
  const pinatas = require("../data.json").pinatas;
  const fs = require("fs");
  const URL = require("url").URL;
  const request = require("request");
  const extensionTypes = ["jpg", "jpeg", "tiff", "png", "gif", "bmp"];

  /* --------------- CANDY --------------- */
  const getAllCandies = () => {
    return candies;
  };

  const createCandy = (candy) => {
    let highestId = 0;
    candies.forEach((u) => {
      if (u.id > highestId) {
        highestId = u.id;
      }
    });
    candy.id = highestId + 1;
    candies.push(candy);
    return candy;
  };

  const getCandyById = (id) => {
    const candy = candies.filter((u) => u.id == id);
    if (candy.length === 0) {
      return -1;
    }
    return candy[0];
  };

  /* --------------- OFFER --------------- */
  const getAllOffers = () => {
    let getOffers = [];
    offers.forEach((u) => {
      getOffers.push({
        id: u.id,
        name: u.name,
        candies: Array.from(u.candies),
      });
    });
    getOffers.forEach((u) => {
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
    pinatas.forEach((u) => {
      getPinatas.push({
        id: u.id,
        name: u.name,
        maximumHits: u.maximumHits,
        currentHits: u.currentHits,
      });
    });
    return getPinatas;
  };

  //should contain all properties excluding surprise - check
  const getPinataById = (id) => {
    const pinata = getAllPinatas().filter((u) => u.id == id);
    if (pinata.length == 0) {
      return -1;
    }
    return pinata;
  };

  const createPinata = (pinata) => {
    const newPinata = {
      id: pinatas.length + 1,
      name: pinata.name,
      surprise: pinata.surprise,
      maximumHits: pinata.maximumHits,
      currentHits: 0,
    };
    pinatas.push(newPinata);
    return newPinata;
  };

  const stringIsUrl = (s) => {
    //Used to test if surprise is an URL
    try {
      new URL(s);
      return true;
    } catch (err) {
      return false;
    }
  };

  const hitPinata = (id) => {
    const pinata = pinatas.find((u) => u.id == id);
    if (pinata.length == 0) {
      return -1;
    }

    if (pinata.currentHits == pinata.maximumHits) {
      return -2;
    }

    pinata.currentHits++;

    //If last hit
    if (pinata.currentHits == pinata.maximumHits) {
      if (stringIsUrl(pinata.surprise)) {
        //If url find extension
        var extension = "";
        for (var a = 0; a < extensionTypes.length; a++) {
          if (pinata.surprise.includes(extensionTypes[a])) {
            extension = extensionTypes[a];
            break;
          }
        }
        request(pinata.surprise).pipe(
          fs.createWriteStream("images/" + pinata.name + "." + extension)
        );
      } else {
        fs.appendFile("surprises.txt", pinata.surprise + " ", function (err) {
          if (err) return false;
        });
      }
      return pinata.surprise;
    }

    if (pinata.currentHits != pinata.maximumhits) {
      return 1;
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
    hitPinata,
  };
};

module.exports = service();
