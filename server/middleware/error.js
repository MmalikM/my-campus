function errorHandler(error, req, res, next) {
  console.log(error);
  let status, message;

  switch (error.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "Not Found":
      status = 404;
      message = "Data not found";
      break;
    case "used":
      status = 403;
      message = "Sudah ada di Favorit";
      break;
    case "email_password_required":
      status = 400;
      message = "email/password required";
      break;
    case "email/password_incorrect":
      status = 401;
      message = "email/password incorrect";
      break;
    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthenticated";
      break;
    case "not_gmail":
      status = 403;
      message = "just for gmail";
      break;
    case "subscribed":
      status = 400;
      message = "you're subscribed";
      break;
    default:
      status = 500;
      message = "ISE";
      break;
  }
  res.status(status).json({ message: message });
}

module.exports = errorHandler;
