import axios from "axios";

const API = "https://lifeline-ai-backend-production.up.railway.app/api";  // ✅ no trailing slash, added /api

export const submitTriage = async (data) => {
  try {
    const res = await axios.post(`${API}/triage`, data);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.detail || "Could not connect to backend. Is the server running?" };
  }
};

export const getQueue = async () => {
  try {
    const res = await axios.get(`${API}/queue`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch queue:", err);
    return [];
  }
};