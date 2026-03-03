const prisma = require("../lib/prisma");
const { nanoid } = require("nanoid");

exports.createWorkspace = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ message: "Workspace name required" });

    const inviteCode = nanoid(8);

    const workspace = await prisma.workspace.create({
      data: {
        name,
        inviteCode,
        ownerId: req.userId,
        members: {
          create: {
            userId: req.userId,
            role: "owner",
          },
        },
      },
    });

    res.status(201).json(workspace);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.joinWorkspace = async (req, res) => {
  try {
    const { inviteCode } = req.body;

    const workspace = await prisma.workspace.findUnique({
      where: { inviteCode },
    });

    if (!workspace)
      return res.status(404).json({ message: "Workspace not found" });

    const existing = await prisma.member.findUnique({
      where: {
        userId_workspaceId: {
          userId: req.userId,
          workspaceId: workspace.id,
        },
      },
    });

    if (existing)
      return res.status(400).json({ message: "Already joined" });

    await prisma.member.create({
      data: {
        userId: req.userId,
        workspaceId: workspace.id,
      },
    });
    
    res.json({ message: "Joined workspace", workspaceId: workspace.id });
} catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
}
};
exports.getMyWorkspaces = async (req, res) => {
try {
const workspaces = await prisma.member.findMany({
  where: { userId: req.userId },
  include: {
    workspace: true,
  },
});

res.json(workspaces.map(m => m.workspace));
} catch (err) {
console.error(err);
res.status(500).json({ message: "Server error" });
}
};