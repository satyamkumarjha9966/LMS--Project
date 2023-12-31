import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import courseRouter from "./routes/course.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import miscellaneousRoutes from "./routes/miscellaneous.route.js";

const app = express();

// Middle Ware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // So that URL data can easily encoded
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
// Middle Ware

app.use("/ping", (req, res) => {
  res.send("Pong");
});

// Routes of 4 Modules (user, courses, payment, miscellaneous)
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/miscellaneous", miscellaneousRoutes);

app.all("*", (req, res) => {
  res.status(404).send("OOPS!! 404 Page Not Found");
});

app.use(errorMiddleware);

export default app;
