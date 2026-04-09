import { useEffect, useState } from "react";
import HealthCard from "../components/HealthCard";
import HealthChart from "../components/HealthChart";
import { fetchHealthData } from "../Services/api";

export default function Dashboard() {
  const [data, setData] = useState({
    heartRate: 0,
    temperature: 0,
    spo2: 0,
  });

  const [heartRate, setHeartRate] = useState([]);
  const [temperature, setTemperature]=useState([]);
  const [spo2,setSpo2]=useState([]);


  // React Hook: useEffect()
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetchHealthData();
      setData(res);

      //to set heart rate data
      setHeartRate((prev) => [
        ...prev.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          value:res.heartRate
        },
      ]);

      //to set temperature data
      setTemperature((prev) => [
        ...prev.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          value:res.temperature.toFixed(1)
        },
      ]);
      
    //to set spo2
    setSpo2((prev) => [
    ...prev.slice(-9),
    {
      time: new Date().toLocaleTimeString(),
      value:res.spo2
    },
    ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-3xl font-bold mb-6">
        Health Monitoring Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        <HealthCard
          title="Heart Rate"
          value={data.heartRate}
          unit="bpm"
          icon="❤️"
          color="bg-red-500"
        />

        <HealthCard
          title="Temperature"
          value={data.temperature.toFixed(1)}
          unit="°C"
          icon="🌡️"
          color="bg-orange-500"
        />

        <HealthCard
          title="SpO2"
          value={data.spo2}
          unit="%"
          icon="🫁"
          color="bg-blue-500"
        />

      </div>

      {/* Chart */}
      <div className="flex flex-col gap-5">
        <HealthChart data={heartRate} color="#ef4444" />
        <HealthChart data={temperature} color=" #f97316" />
        <HealthChart data={spo2} color="#0000FF" />
        
      </div>
   

    </div>
  );
}