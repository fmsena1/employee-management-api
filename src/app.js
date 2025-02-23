require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./infrastructure/web/routes/index");
const swaggerConfig = require('./config/swagger');

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const regex = new RegExp(`^(${allowedOrigins.map(origin => origin.replace('.', '\\.')).join('|')})(\\.|:|$)`);
    if (allowedOrigins.some(allowedOrigin => regex.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error(`🚫 Origin not allowed: ${origin}`));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", routes);

swaggerConfig(app);

module.exports = app;