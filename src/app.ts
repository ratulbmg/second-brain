import dotenv from "dotenv";
import routes from "./routes"
import Express from "express";
import errorHandler from "./middleware/errorMiddleware";
import { requestLogger, errorLogger } from "./middleware/loggerMiddleware";

dotenv.config();
const app = Express();

// Add request logging middleware (should be first)
app.use(requestLogger);

app.use(Express.json());

app.use(routes);

// Add error logging middleware (before error handler)
app.use(errorLogger);
app.use(errorHandler);

export default app;