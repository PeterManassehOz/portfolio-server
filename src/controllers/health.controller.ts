import type { Request, Response } from "express";
import dns from "node:dns";
import net from "node:net";

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
  });
};

export const getEmailNetworkHealth = (
  _req: Request,
  res: Response
): void => {
  const hostname = "smtp.gmail.com";
  const port = 587;

  dns.lookup(
    hostname,
    { all: true },
    (dnsError, addresses) => {
      if (dnsError) {
        res.status(200).json({
          success: false,
          stage: "dns",
          hostname,
          error: dnsError.message,
          code: dnsError.code,
        });

        return;
      }

      const results: Array<{
        address: string;
        family: number;
        status: "connected" | "error" | "timeout";
        error?: string;
      }> = [];

      let completed = 0;

      const finish = () => {
        completed += 1;

        if (completed < addresses.length) return;

        const hasConnection = results.some(
          (result) => result.status === "connected"
        );

        res.status(200).json({
          success: hasConnection,
          stage: "tcp",
          hostname,
          port,
          dns: addresses,
          connections: results,
        });
      };

      for (const address of addresses) {
        const socket = net.createConnection({
          host: address.address,
          port,
          family: address.family,
        });

        let finished = false;

        const complete = (
          status: "connected" | "error" | "timeout",
          error?: string
        ) => {
          if (finished) return;

          finished = true;

          results.push({
            address: address.address,
            family: address.family,
            status,
            ...(error && { error }),
          });

          socket.destroy();
          finish();
        };

        socket.once("connect", () => {
          complete("connected");
        });

        socket.once("error", (error) => {
          complete("error", error.message);
        });

        socket.setTimeout(10_000, () => {
          complete("timeout");
        });
      }
    }
  );
};