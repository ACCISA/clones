import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import axios from "axios";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  const register = async (ev) => {
    ev.preventDefault();
    const { data } = await axios.post("/register", { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  };
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={register}>
        <input
          className="block w-full rounded-sm p-2 mb-2 border"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          className="block w-full rounded-sm p-2 mb-2 border"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="bg-blue-500 rounded-sm text-white block w-full">
          Register
        </button>
      </form>
    </div>
  );
}
