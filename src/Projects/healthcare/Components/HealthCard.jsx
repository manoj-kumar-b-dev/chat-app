// React functional component
export default function HealthCard({ title, value, unit, icon, color }) {
  return (
   <div className={`p-5 rounded-2xl shadow-md ${color} text-white`}>
      <div className="text-3xl mb-2">{icon}</div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold">{value} <span className="text-sm">{unit}</span></p>
   </div>)
}
