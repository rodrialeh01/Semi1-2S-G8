import express from "express";
import morgan from "morgan";
import cors from "cors";
import { API_PORT } from "./config/credentials.js";
import { connect } from "./db/dbConnection.js";
import testHandler from "./routes/test.routes.js";
import authHandler from "./routes/auth.routes.js";
import publicacionHandler from "./routes/publication.routes.js";
import userHandler from "./routes/user.routes.js";
import commentHandler from "./routes/comment.routes.js";
import responseMiddleware from "./middlewares/response.js";
import error404Handler from "./routes/404.routes.js";
import translateHandler from "./routes/translate.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(responseMiddleware);

connect(); 

app.use(testHandler);
app.use(authHandler);
app.use(userHandler);
app.use(publicacionHandler);
app.use(commentHandler);
app.use(error404Handler);
app.use(translateHandler);

app.listen(API_PORT);
console.log(`Server on port ${API_PORT}`);