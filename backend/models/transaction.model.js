import Mongoose from "mongoose";

const transactionSchema = new Mongoose.Schema({
    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
		type: String,
		required: true,
	},
	paymentType: {
		type: String,
		enum: ["cash", "card"],
		required: true,
	},
	category: {
		type: String,
		enum: ["saving", "expense", "investment"],
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	location: {
		type: String,
		default: "Unknown",
	},
	date: {
		type: Date,
		required: true,
	},
});

const Transaction = Mongoose.model("Transaction", transactionSchema);
export default Transaction;