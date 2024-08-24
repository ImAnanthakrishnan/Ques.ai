class Helpers {
  constructor(id = null) {
    this._id = id;
  }

  sendMessage(res, statusCode, msg, data = null) {
    const response = {
      message: msg,
    };
    if (data) {
      response.data = data;
    }
    res.status(statusCode).json(response);
  }
}

export default Helpers;