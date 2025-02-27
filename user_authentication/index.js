import express from "express";
import { ROUTES } from "./routes/routes.js";

import { logger } from "./utils/logging.js";
import { proxies } from "./utils/proxy.js";
import { setupAuth } from "./middleware/setupAuth.js";
import authentication from "./routes/authentication.js";


import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

logger(app);
setupAuth(app, ROUTES);
proxies(app, ROUTES);


app.use(express.urlencoded({ extended: true }));// parse_url_encoded_request_bodies
app.use(express.json());
app.use(cors());
// define_root_route
app.use("/api/v1/auth", authentication);// setup_authentication_route


app.get("/", (req, res) => {
  res.send("Health care Module!");
});
// start_server_and_listen_on_defined_por
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})


export default app;// export_express_application_instance