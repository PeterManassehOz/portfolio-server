import app from "./src/app.js";
import { connectDatabase } from "./src/config/database.js";
import { env } from "./src/config/env.js";

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(env.PORT, () => {
    console.log(`🚀 Portfolio API running on port ${env.PORT}`);
    console.log(`🌍 Environment: ${env.NODE_ENV}`);
  });
};

startServer();