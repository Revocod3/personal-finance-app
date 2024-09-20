import { AreaChart } from "@mantine/charts";
import { useQuery } from "@tanstack/react-query";
import apiFetcher from "../../../../services/api";

const CStackedChart = () => {
  const token = sessionStorage.getItem("authToken");
  const getStatsOverTime = () => {
    return apiFetcher("expenses/stats/", "GET", token);
  };

  const { data: statsOverTime } = useQuery({
    queryKey: ["expenses/stats/"],
    queryFn: getStatsOverTime,
  });

  return (
    <AreaChart
      h={350}
      data={statsOverTime}
      dataKey="date"
      type="stacked"
      series={[{ name: "Gasto", color: "red.6" }]}
    />
  );
};
export default CStackedChart;
