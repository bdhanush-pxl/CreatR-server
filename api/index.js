import app from "../app.js";
import connectDB from "../db/index.js";

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
