import { useQuery } from "@tanstack/react-query";
import apiFetcher from "../../services/api";
import CStackedChart from "./components/CStackedChart/CStackedChart";
import Donut from "./components/DonutChart/DonutChart";

const ReportPage = () => {
  const token = sessionStorage.getItem("authToken");

  const getCardsData = () => {
    return apiFetcher("cards", "GET", token);
  };

  const { data: cardsData } = useQuery({
    queryKey: ["cards"],
    queryFn: getCardsData,
  });

  const getExpensesByType = () => apiFetcher("expenses/by_type/", "GET", token);

  const { data: expensesByType } = useQuery({
    queryKey: ["expensesByType"],
    queryFn: getExpensesByType,
  });

  const getIncomesByType = () => apiFetcher("incomes/by_type/", "GET", token);

  const { data: incomesByType } = useQuery({
    queryKey: ["incomesByType"],
    queryFn: getIncomesByType,
  });

  const downloadReport = (type, format) => {
    const url = `/api/${type}/report/?format=${format}`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${type}_report.${format}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => console.error("Error downloading report:", error));
  };

  return (
    <>
      <div className="container mx-auto grid grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-lg min-h-[100px] p-4 font-thin text-lg shadow-md flex flex-col">
          <span className="text-stone-700">Ingresos Totales</span>
          <span className="text-center font-bold text-xl text-gray-800">
            {cardsData?.total_income}
          </span>
        </div>
        <div className="border border-gray-200 rounded-lg min-h-[100px] p-4 font-thin text-lg shadow-md flex flex-col">
          <span className="text-stone-700">Egregos Totales</span>
          <span className="text-center font-bold text-xl text-gray-800">
            {cardsData?.total_expenses}
          </span>
        </div>
        <div className="border border-gray-200 rounded-lg min-h-[100px] p-4 font-thin text-lg shadow-md flex flex-col">
          <span className="text-stone-700">Balance</span>
          <span className="text-center font-bold text-xl text-gray-800">
            {cardsData?.balance}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 container mx-auto mt-10">
        <span className="font-semibold text-lg">
          Evolución de gastos en el tiempo
        </span>
        <CStackedChart />
      </div>
      <div className="grid grid-cols-3 gap-6 mt-10 mx-auto container">
        <div className="flex flex-col">
          <span className="font-semibold text-lg">Gastos por categoría</span>
          <Donut data={expensesByType} />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-lg">Ingresos por categoría</span>
          <Donut data={incomesByType} />
        </div>
        <div className="flex flex-col gap-4 container mx-auto mt-10">
          <button
            onClick={() => downloadReport("expenses", "csv")}
            className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
          >
            Download Expenses CSV
          </button>
          <button
            onClick={() => downloadReport("expenses", "pdf")}
            className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
          >
            Download Expenses PDF
          </button>
          <button
            onClick={() => downloadReport("incomes", "csv")}
            className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
          >
            Download Incomes CSV
          </button>
          <button
            onClick={() => downloadReport("incomes", "pdf")}
            className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
          >
            Download Incomes PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
