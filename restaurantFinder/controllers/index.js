/* Online */
export const index = (_, res) => {
  res.send({ status: 200 });
};

/* 404 */
export const err404 = (req, _, next) => {
  const url = req.params.catch_all;
  const err = new Error();
  err.message = `${url} not found`;
  err.number = 404;

  next(err);
};

export default { index, err404 };
