import { Widgets } from "./dbConnector";
import { reject } from "lodash";

const resolver = {
  getProduct: ({ id }) => {
    return new Promise((resolve) => {
      Widgets.findById({ _id: id }, (err, product) => {
        if (err) {
          reject(err);
        } else resolve(product);
      });
    });
  },
  createProduct: ({ input }) => {
    const newWidget = new Widgets({
      name: input.name,
      description: input.description,
      price: input.price,
      soldout: input.soldout,
      inventory: input.inventory,
      stores: input.stores,
    });

    newWidget.id = newWidget._id;

    return new Promise((resolve) => {
      newWidget.save((err) => {
        if (err) reject(err);
        else resolve(newWidget);
      });
    });
  },

  updateProduct: ({ input }) => {
    return new Promise((resolve) => {
      Widgets.findOneAndUpdate(
        { _id: input.id },
        input,
        { new: true },
        (err, widget) => {
          if (err) reject(err);
          else resolve(widget);
        }
      );
    });
  },

  deleteProduct: ({ id }) => {
    return new Promise((resolve) => {
      Widgets.remove({ _id: id }, (err) => {
        if (err) reject(err);
        else resolve("Product deleted successfully");
      });
    });
  },

  getAllProducts: () => {
    return Widgets.find({});
  },
};

export default resolver;
