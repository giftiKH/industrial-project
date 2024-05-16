const mongoose = require("mongoose");
// MongoDB connection configuration
mongoose
  .connect("mongodb+srv://giftikebede21:giftikebede21@cluster0.pp7fi4a.mongodb.net/new?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
