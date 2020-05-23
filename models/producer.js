import mongoose from "mongoose";

const producerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sell_addresses: [
      {
        address: String,
        City: String,
      },
    ],
  },
  { timestamps: true }
);

const Producer = mongoose.model("Producer", producerSchema);

export default Producer;
