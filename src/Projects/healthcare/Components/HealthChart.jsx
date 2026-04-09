import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HealthChart({ data, color }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={color} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}