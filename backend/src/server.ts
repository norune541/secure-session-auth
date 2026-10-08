import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { env } from "./config/env";
import { authRouter } from "./modules/auth/auth.routes";
import { userRouter } from "./modules/user/user.routes";
import { errorHandler } from "./common/middlewares/errorHandler";

const app = express();
const PORT = env.PORT;
const allowedOrigins = new Set([
  "https://sessions-frontend-production.up.railway.app",
  "http://localhost:5173",
]);

app.set("trust proxy", true);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, origin);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    const origin = req.get("origin");

    if (origin && !allowedOrigins.has(origin)) {
      return res.status(403).json({
        error: {
          type: "CSRF_ERROR",
          message: "Invalid origin",
        },
      });
    }
  }

  next();
});
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`http://localhost:${PORT}`);
});
