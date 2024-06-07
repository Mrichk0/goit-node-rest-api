const ctrlWrapper = (fn) => {
  const ctrl = async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return ctrl;
};

export default ctrlWrapper;
