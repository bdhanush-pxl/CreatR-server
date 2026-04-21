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
  credentials: true
}));

// ⚠️ Handle preflight
app.options("*", cors());


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API is running....")
})

app.use('/api/users', userRoutes);




export default app