import axios from "axios";

export const fetchHealthData = async () => {
  // Simulated API (later replace with real backend)
  return {
    heartRate: 75 + Math.floor(Math.random() * 10),
    temperature: 36 + Math.random(),
    spo2: 95 + Math.floor(Math.random() * 5),
  };
};   