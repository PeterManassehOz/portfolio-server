import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import apiRoutes from "./routes/index.js";
import { notFoundHandler } from "./middlewares/notFound-middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: [
      env.CLIENT_URL,
      env.ADMIN_URL,
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio server is healthy",
  });
});

app.use("/api/v1", apiRoutes);

// 404 handler
app.use(notFoundHandler);

// Central error handler
app.use(errorHandler);

export default app;