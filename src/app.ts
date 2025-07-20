import dotenv from "dotenv";
import routes from "./routes"
import Express  from "express";
import errorHandler from "./middleware/errorMiddleware";

dotenv.config();
const app = Express();
app.use(Express.json());


app.use(routes);
app.use(errorHandler);


export default app;