import Transaction from "../models/transaction.model.js";

const trasactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized access");
        const userId = await context.getUser()._id;
        console.log("Fetching transactions for userId: " + userId);
        const transaction = await Transaction.find({ userId });
        return transaction;
      } catch (err) {
        console.error("Error in getting transactions: ", err);
        throw new Error(err.message || "Internal Server error");
      }
    },
    transaction: async (_, { transactionId }, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized access");
        const userId = await context.getUser()._id;
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (err) {
        console.error("Error in getting transactions: ", err);
        throw new Error(err.message || "Internal Server error");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (err) {
        console.error("Error creating transaction:", err);
        throw new Error("Error creating transaction");
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          {
            new: true,
          }
        );
        return updatedTransaction;
      } catch (err) {
        console.error("Error updating transaction:", err);
        throw new Error("Error updating transaction");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (err) {
        console.error("Error deleting transaction:", err);
        throw new Error("Error deleting transaction");
      }
    },
  },
};

export default trasactionResolver;
