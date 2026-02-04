import { useState } from "react";
import api from "../api/api.js";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");

  const generate = async () => {
    const res = await api.post("/url", { url });
    setShort(res.data.id);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white p-6 shadow rounded max-w-xl">
        <input
          className="w-full border p-2 mb-4"
          placeholder="Enter long URL"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={generate} className="bg-primary text-white px-4 py-2 rounded">
          Shorten
        </button>

        {short && (
          <p className="mt-4 text-green-600">
            Short URL: http://localhost:8000/url/{short}
          </p>
        )}
      </div>
    </div>
  );
}



