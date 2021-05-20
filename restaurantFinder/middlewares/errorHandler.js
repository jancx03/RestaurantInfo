export default (err, _req, res, next) => {
  const { number, message } = err;
  const status = number ?? 500;
  res.status = status;
  res.send({ status, message });
  next();
};
