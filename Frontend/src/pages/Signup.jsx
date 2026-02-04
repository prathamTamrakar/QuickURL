import { useState } from "react";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/user", form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-8 shadow-lg rounded w-96">
        <h2 className="text-2xl font-bold mb-6 text-primary">Sign Up</h2>
        <input className="input" placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="input" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
        <input type="password" className="input" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
        <button className="w-full bg-primary text-white py-2 rounded mt-4">
          Create Account
        </button>
      </form>
    </div>
  );
}
