const express = require("express");
const cors = require("cors");
const services = require("./src/services");
const {
	unAuthorizedHandler,
	forbiddenHandler,
	notFoundHandler,
	genericHandler,
	badRequestHandler,
} = require("./src/helpers/errorHandling");

// INITIAL SETUP
const server = express();
require("dotenv").config();
server.use(cors());
server.use(express.json());
const port = process.env.PORT || 5000;
//MAIN ROUTE
server.use("/api", services);

// ERROR HANDLING MIDDLEWARES
server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(forbiddenHandler);
server.use(unAuthorizedHandler);
server.use(genericHandler);

server.listen(port, () => {
	console.log("Server is running on PORT:", port);
});
