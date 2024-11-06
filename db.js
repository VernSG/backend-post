const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = 'yourdbname'; // Ganti 'yourdbname' dengan nama database Anda

  try {
    console.log("Connecting to MongoDB at:", mongoURI); // Mencetak URL untuk debugging

    // Menghubungkan ke MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Menghentikan proses jika terjadi error
  }
};

module.exports = connectDB; // Mengekspor fungsi connectDB untuk digunakan di server.js
