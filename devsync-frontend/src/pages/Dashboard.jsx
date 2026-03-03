import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
    const navigate = useNavigate();
  const fetchWorkspaces = async () => {
    const { data } = await API.get("/workspaces");
    setWorkspaces(data);
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const createWorkspace = async () => {
    await API.post("/workspaces", { name });
    setName("");
    fetchWorkspaces();
  };

  const joinWorkspace = async () => {
    await API.post("/workspaces/join", { inviteCode });
    setInviteCode("");
    fetchWorkspaces();
  };

  return (
    <>
    <Navbar />
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-3xl font-bold mb-6">Your Workspaces</h1>

    <div className="flex gap-4 mb-6">
      <input
        className="border px-4 py-2 rounded"
        placeholder="Workspace name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={createWorkspace}
      >
        Create
      </button>
    </div>

    <div className="flex gap-4 mb-8">
      <input
        className="border px-4 py-2 rounded"
        placeholder="Invite code"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
      />
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded"
        onClick={joinWorkspace}
      >
        Join
      </button>
    </div>

    <div className="grid grid-cols-3 gap-6">
      {workspaces.map((w) => (
        <div
          key={w.id}
          className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate(`/workspace/${w.id}`)}
        >
          <h3 className="font-semibold">{w.name}</h3>
          <p className="text-sm text-gray-500">
            Invite: {w.inviteCode}
          </p>
        </div>
      ))}
    </div>
  </div>
  </>
);
}