import Product from "../model/product";
import { object, string, number } from "yup";

const productSchema = new object({
  name: string().required(),
  price: number().positive().integer().required(),
  description: string().max(255).required(),
});

// get Products

const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.json({
        message: "Khong co san pham nao !!!",
      });
    }
    return res.json(products);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

// get Products

const getOne = async (req, res) => {
  try {
    const products = await Product.find({ _id: req.params.id });
    if (!products) {
      return res.json({
        message: "San pham khong ton ati !!!",
      });
    }
    return res.json({
      message: "Chi tiet san pham",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

// Create Product

const create = async (req, res) => {
  try {
    await productSchema
      .validate(req.body, { abortEarly: false })
      .then(async () => {
        const products = await Product.create(req.body);
        if (!products) {
          return res.json({
            message: "Them san pham that bai !!!",
          });
        }
        return res.json({
          message: "Them san pham",
          products,
        });
      });
  } catch ({ errors }) {
    return res.status(400).json({
      message: errors,
    });
  }
};

// Update Product

const update = async (req, res) => {
  try {
    await productSchema
      .validate(req.body, { abortEarly: false })
      .then(async () => {
        const products = await Product.updateOne(
          { _id: req.params.id },
          req.body
        );
        if (!products) {
          return res.json({
            message: "Sua san pham that bai !!!",
          });
        }
        return res.json({
          message: "Sua san pham",
          products,
        });
      });
  } catch ({ errors }) {
    return res.status(400).json({
      message: errors,
    });
  }
};

// Remove Product

const remove = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    return res.json({
      message: "Xoa san pham",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export { getAll, create, update, remove, getOne };
