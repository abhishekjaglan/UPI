"use strict";
require("dotenv").config();
module.exports = {
    PORT: process.env.PORT || 3005
};
console.log(process.env.PORT);
