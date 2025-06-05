import express from "express";
import authRoutes from "./routes/auth";

const app = express();
app.use(express.json());

// Handle requests to the root URL
app.get("/", (_req, res) => {
  res.send("Welcome to the homepage!");
});

app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
