"use strict";

const express = require("express");

const app = express();
const host = "0.0.0.0";
const port = 8080;

app.disable("x-powered-by");

app.get("/", (_request, response) => {
  response.json({
    application: "gitops-demo-be",
    message: "GitOps Demo Backend is running",
    environment: "production"
  });
});

app.get("/api", (_request, response) => {
  response.json({
    application: "gitops-demo-be",
    status: "running",
    environment: "production",
    version: "1.0.0"
  });
});

app.get("/health", (_request, response) => {
  response.type("text/plain").status(200).send("OK\n");
});

const server = app.listen(port, host, () => {
  console.log(`GitOps Demo Backend listening on http://${host}:${port}`);
});

function shutdown(signal) {
  console.log(`${signal} received; shutting down`);
  server.close((error) => {
    if (error) {
      console.error("Graceful shutdown failed", error);
      process.exit(1);
    }
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
