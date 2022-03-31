import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const transactionSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    card: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Card",
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      min: 0,
      required: true,
      validate: {
        validator: (v) => v > 0,
        message: (prop) => `Amount (${prop.value}) cannot be used!`,
      },
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    attachment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// transactionSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);

//   this.password = bcrypt.hashSync(this.password, salt);

//   next();
// });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
