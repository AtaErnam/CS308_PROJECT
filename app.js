const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRoute");
const reviewRouter = require("./routes/reviewRoute");
const orderRouter = require("./routes/orderRoute");
const orderItemRouter = require("./routes/orderItemRoute");
const refundRouter = require("./routes/refundRoute");

const app = express();

// 1) Middlewares

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.options("*", cors());
/* const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/api', createProxyMiddleware({ 
    target: 'http://localhost:3008/', //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
})); */
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
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/orderItems", orderItemRouter);
app.use("/api/v1/refund", refundRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
