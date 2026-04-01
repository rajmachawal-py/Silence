import axios from "axios";

const API = "http://127.0.0.1:8000/api";  // ✅ changed from localhost to 127.0.0.1

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