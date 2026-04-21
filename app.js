import 'dotenv/config';
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"

const app = express()

app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});

// 🔒 Strict CORS (no normalization, exact match only)
app.use(cors({
  origin: function (origin, callback) {
    console.log("CORS check:", origin);

    if (!origin) return callback(null, true); // allow Postman / server requests

    if (origin === process.env.CORS_ORIGIN) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ensure all methods are allowed
  allowedHeaders: ["Content-Type", "Authorization"] // Allow necessary headers
}));

// Ensure preflight requests are handled
app.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204); // No content
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API is running....")
})

app.use('/api/users', userRoutes);




export default app