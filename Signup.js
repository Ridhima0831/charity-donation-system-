import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";

export default function Dashboard() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // LOAD DONATIONS
  const load = async () => {
    const res = await axios.get("http://127.0.0.1:5000/api/donation");
    setList(res.data);
  };

  // DELETE DONATION
  const deleteDonation = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/api/donation/${id}`);
    alert("Deleted ✅");
    load();
  };

  useEffect(() => {
    load();
  }, []);

  // TOTAL AMOUNT
  const total = list.reduce((sum, d) => sum + Number(d.amount), 0);

  return (
    <div className="container">

      {/* TITLE */}
      <h2 style={{ color: "#667eea" }}>
        Charity Donation System
      </h2>

      {/* USER */}
      <h3>Welcome {user?.name}</h3>

      {/* TOTAL */}
      <h3>Total Donations: ₹{total}</h3>

      {/* SEARCH */}
      <input
        placeholder="Search by name"
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />

      {/* BUTTONS */}
      <button onClick={() => window.location.href = "/donate"}>
        Donate Now
      </button>

      <button onClick={() => {
        localStorage.clear();
        window.location.href = "/login";
      }}>
        Logout
      </button>

      <hr />

      <h3>All Donations</h3>

      {/* LIST */}
      {list
        .filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
        .map((d) => (
          <div key={d._id} className="card">
            <h4>{d.name}</h4>

            <p>₹{d.amount}</p>

            <small>
              {new Date(d.date).toLocaleDateString()}
            </small>

            <br />

            <button onClick={() => deleteDonation(d._id)}>
              Delete
            </button>
          </div>
        ))}

    </div>
  );
}