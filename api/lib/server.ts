// lib/server.ts
import app from "./app";

const env = process.env.NODE_ENV || 'development';
const config = require('../environment')[env];


app.listen(config.server.port, () => {
    console.log("Express server listening on port " + config.server.port);
});
