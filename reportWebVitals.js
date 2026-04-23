import axios from "axios";
import { useState } from "react";
import "../App.css";

export default function Donate() {
  const [data, setData] = useState({
    name: "",
    amount: "",
    message: ""
  });

  const [scanMode, setScanMode] = useState(false);

  // INPUT HANDLE
  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // SCANNER SIMULATION
  const simulateScan = () => {
    const fakeAmount = Math.floor(Math.random() * 500) + 50;
    setData((prev) => ({ ...prev, amount: fakeAmount }));
    alert("QR Scanned Successfully ✅");
  };

  // SUBMIT DONATION
  const submit = async () => {
    if (!data.name || !data.amount) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:5000/api/donation", data);

      alert(`Thank you ${data.name} for donating ₹${data.amount} ❤️`);

      setData({ name: "", amount: "", message: "" });
    } catch {
      alert("Error adding donation ❌");
    }
  };

  return (
    <div className="container">

      {/* TITLE */}
      <h2 style={{ color: "#667eea" }}>
        Make a Donation
      </h2>

      {/* SCANNER BUTTON */}
      <button onClick={() => setScanMode(!scanMode)}>
        {scanMode ? "Close QR Scanner" : "Open QR Scanner"}
      </button>

      {/* SCANNER UI */}
      {scanMode && (
        <div
          style={{
            border: "2px dashed #667eea",
            padding: "20px",
            borderRadius: "10px",
            margin: "15px"
          }}
        >
          <p>📷 QR Scanner Active</p>
          <button onClick={simulateScan}>Scan QR</button>
        </div>
      )}

      {/* FORM */}
      <input
        name="name"
        placeholder="Your Name"
        value={data.name}
        onChange={handle}
      />

      <input
        name="amount"
        placeholder="Amount"
        value={data.amount}
        onChange={handle}
      />

      <input
        name="message"
        placeholder="Message (optional)"
        value={data.message}
        onChange={handle}
      />

      {/* SUBMIT */}
      <button onClick={submit}>
        Confirm Donation
      </button>

      <br />

      {/* BACK BUTTON */}
      <button
        onClick={() => window.location.href = "/dashboard"}
      >
        Back to Dashboard
      </button>

    </div>
  );
}