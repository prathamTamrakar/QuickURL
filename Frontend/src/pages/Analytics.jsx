import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api.js";

export default function Analytics() {
  const { shortId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/url/analytics/${shortId}`).then(res => setData(res.data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      {data && (
        <div className="bg-white p-6 shadow rounded">
          <p>Total Clicks: {data.totalClicks}</p>
        </div>
      )}
    </div>
  );
}
