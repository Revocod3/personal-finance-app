import { BarChart as Bar } from "@mantine/charts";
import classes from "./BarChart.module.css";
import { data } from "./BarChart.helpers";

const BarChart = () => {
  return (
    <Bar
      h={300}
      data={data}
      dataKey="month"
      className={classes.root}
      series={[{ name: "Smartphones", color: "var(--bar-color)" }]}
    />
  );
};

export default BarChart;
