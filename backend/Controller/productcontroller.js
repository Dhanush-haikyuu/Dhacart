const productmodel = require("../models/productmodel");
exports.productget = async (req, res, next) => {
  const qury = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const product = await productmodel.find(qury);

  res.json({
    status: "success",
    product,
  });
};

exports.getsingleproduct = async (req, res, next) => {
  try {
    const product = await productmodel.findById(req.params.id);
    res.json({
      status: "success",
      product,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "unable to get the product details of given id",
    });
  }
};
