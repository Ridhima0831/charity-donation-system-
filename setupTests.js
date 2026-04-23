import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [data, setData] = useState({});

  const handle = e => setData({...data, [e.target.name]: e.target.value});

  const submit = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        data
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data || "Wrong credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handle}/>
      <input name="password" placeholder="Password" onChange={handle}/>
      <button onClick={submit}>Login</button>
    </div>
  );
}