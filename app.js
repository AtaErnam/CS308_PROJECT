const express = require("express");
const morgan = require("morgan");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRoute");

const app = express();

// 1) Middlewares

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// 2) Routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

import React from "react";
import Form from "./login-page/src/components/login_form";

import "./login-page/App.css";

function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
