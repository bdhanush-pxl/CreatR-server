import 'dotenv/config';
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, cb) => {
    // Allow non-browser clients
    if (!origin) return cb(null, true);

    const ok = allowedOrigins.includes(origin);

    // TEMP DEBUG (keep until it works)
    console.log("CORS origin:", origin, "allowed:", ok, "allowedOrigins:", allowedOrigins);

    return cb(null, ok);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API is running....")
})

app.use('/api/users', userRoutes);




export default app