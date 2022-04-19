import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const cardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      //debit of credit
    },
    amount: {
      type: Number,
      min: 0,
      default: 0,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// cardSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);

//   this.password = bcrypt.hashSync(this.password, salt);

//   next();
// });

const Card = mongoose.model("Card", cardSchema);

export default Card;
