import jwt from "jsonwebtoken";

export const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  switch (status) {
    case 400:
      res.status(status).json({
        title: "Bad Request",
        message: err.message,
      });
      break;
    case 401:
      res.status(status).json({
        title: "Unauthorized",
        message: err.message,
      });
      break;
    case 403:
      res.status(status).json({
        title: "Forbidden",
        message: err.message,
      });
      break;
    case 404:
      res.status(status).json({
        title: "Not Found",
        message: err.message,
      });
      break;
    case 500:
      res.status(status).json({
        title: "Internal Server Error",
        message: err.message,
      });
      break;
    default:
      res.status(status).json({
        title: "No Error ❌",
      });
      break;
  }
  next();
};

export const logger = (req, res, next) => {
  console.log("user logged in");
  next();
};

export const requestTime = (req, res, next) => {
  let today = new Date();
  let now = today.toTimeString();
  req.requestTime = now;
  next();
};

export const checkLogin = async (req, res, next) => {
  res.setHeader("cache-control", "no-cache, no-store, must-revalidate");
  const token = req.cookies.token;
  if (!token) return res.redirect("/");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "you should login" });
  }
};
