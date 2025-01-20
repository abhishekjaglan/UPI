require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3008
};

console.log(process.env.PORT);