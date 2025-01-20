require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3006
};

console.log(process.env.PORT);