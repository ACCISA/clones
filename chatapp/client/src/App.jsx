import { useState } from "react";
import Register from "./components/Register";
import axios from "axios";
function App() {
  const [count, setCount] = useState(0);
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;
  return <Register />;
}

export default App;
