import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
const Donut = (data) => {
  const chartData = Array.isArray(data.data) ? data.data : [];

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={chartData}
        cx={200}
        cy={120}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="value"
        nameKey="name"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default Donut;
