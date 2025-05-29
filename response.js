const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    payload: {
      status_code: statusCode,
      datas: data.rows,
    },
    message: message,
    pagination: {
      prev: "",
      next: "",
      max: "",
    },
  });
};

export default response;
