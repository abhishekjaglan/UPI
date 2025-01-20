require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3007
};

console.log(process.env.PORT);