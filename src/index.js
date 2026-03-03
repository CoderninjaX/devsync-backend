const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const workspaceRoutes = require("./routes/workspace.routes");
const taskRoutes = require("./routes/task.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// health
app.get("/", (req, res) => {
  res.send("DevSync API running");
});

// register routes
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
console.log("Workspace routes loaded:", workspaceRoutes);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwOGZkNTU2My0yZTdmLTQyZjYtODZiYS01YzNhNmE4YjMyYmEiLCJpYXQiOjE3NzIzODQ4ODUsImV4cCI6MTc3Mjk4OTY4NX0.dVD0h05g_ymjVPb-YgnTG8a0xQoj7gkAXEC-Po2P480

// 5XMZd2Lz 