import express from "express";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";
import stripeRouter from "./routes/stripeRoutes";
import database from "./database";
import cookieParser from "cookie-parser";
import cors from "cors";
import {verifyToken} from "./middleware/authentication";
import {handleError} from "./middleware/errorHandler";
import orderRouter from "./routes/orderRoutes";

const app = express();
const port = 4000;

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.use(cookieParser());

app.use("/stripe", stripeRouter);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRouter);
app.use("/products", productRouter);

app.use(verifyToken);
// Rutas que requieren verificación de token
app.use("/orders", orderRouter);

// Middleware de manejo de errores
app.use(handleError);

// Inicialización de la base de datos y del servidor
database
    .initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Express is listening at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Ha ocurrido un error al conectar con la base de datos: " + error);
    });
