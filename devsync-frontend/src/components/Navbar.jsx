import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <h1
        className="font-bold text-lg cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        DevSync
      </h1>

      <button
        className="bg-white text-black px-4 py-1 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}