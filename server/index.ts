import express from "express";
import authRoutes from "./routes/auth";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
