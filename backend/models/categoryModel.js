import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryRef: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    validate: {
      validator: (value) => ["Income", "Expense"].includes(value),
      message: (props) => `${props.value} is not a valid category type`,
    },
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
