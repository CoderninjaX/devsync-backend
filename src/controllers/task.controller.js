const prisma = require("../lib/prisma");

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const { workspaceId } = req.params;

    if (!title)
      return res.status(400).json({ message: "Title required" });

    // check membership
    const member = await prisma.member.findUnique({
      where: {
        userId_workspaceId: {
          userId: req.userId,
          workspaceId,
        },
      },
    });

    if (!member)
      return res.status(403).json({ message: "Not a workspace member" });

    const task = await prisma.task.create({
      data: {
        title,
        description,
        workspaceId,
        createdById: req.userId,
        assignedToId: assignedTo || null,
      },
    });

    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getTasks = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    // check membership
    const member = await prisma.member.findUnique({
      where: {
        userId_workspaceId: {
          userId: req.userId,
          workspaceId,
        },
      },
    });

    if (!member)
      return res.status(403).json({ message: "Not a workspace member" });

    const tasks = await prisma.task.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const allowed = ["todo", "inprogress", "done"];
    if (!allowed.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    // membership check
    const member = await prisma.member.findUnique({
      where: {
        userId_workspaceId: {
          userId: req.userId,
          workspaceId: task.workspaceId,
        },
      },
    });

    if (!member)
      return res.status(403).json({ message: "Not allowed" });

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};