import "dotenv/config";

import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import helmet from "helmet";

import { prisma } from "./lib/prisma.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

const PORT = Number(process.env.PORT ?? 5050);

const FRONTEND_URL =
  process.env.FRONTEND_URL ?? "http://localhost:3000";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use(
  express.json({
    limit: "2mb",
  })
);

app.get(
  "/health",
  (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "A ATELIER API is running",
      timestamp: new Date().toISOString(),
    });
  }
);

app.get(
  "/api/health/db",
  async (_req: Request, res: Response) => {
    try {
      await prisma.$queryRaw`SELECT 1`;

      res.status(200).json({
        success: true,
        database: "connected",
        databaseName:
          process.env.DATABASE_NAME ?? "a_atelier",
      });
    } catch (error) {
      console.error(
        "Database health check failed:",
        error
      );

      res.status(500).json({
        success: false,
        database: "disconnected",
        message: "Database connection failed",
      });
    }
  }
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error(
      "Unhandled server error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
);

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log(
      "MySQL + Prisma connection established"
    );

    app.listen(PORT, () => {
      console.log(
        `A ATELIER API running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error
    );

    await prisma.$disconnect();

    process.exit(1);
  }
};

const shutdown = async (signal: string) => {
  console.log(
    `${signal} received. Shutting down server...`
  );

  await prisma.$disconnect();

  process.exit(0);
};

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

void startServer();