import 'dotenv/config';
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"

const app = express()

// 🔒 Strict CORS (no normalization, exact match only)
const allowedOrigins = [
  "https://creat-r-client.vercel.app",
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // Postman/curl
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(null, false); // don't throw Error; just disallow
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

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