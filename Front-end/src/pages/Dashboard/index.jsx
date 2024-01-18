import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SideBar from "../../components/SideBar";
import { ChangePage } from "../../redux/features/activePage";
import { container } from "../../styles/global.css";
import Header from "../../components/Header";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Oval } from 'svg-loaders-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function Dashboard() {

  const dispatch = useDispatch()

  const [totalMonthInvested, setTotalMonthInvested] = useState(0)
  const [totalMonthSaled, setTotalMonthSaled] = useState(0)
  const [totalProfitMonths, setTotalProfitMonths] = useState(0)
  const [totalRequestsInTransit, setTotalRequestsInTransit] = useState(0)
  const [productsWithCriticalStock, setProductsWithCriticalStock] = useState([])
  const [totalMonthComission, setTotalMonthComission] = useState(0)
  const [labelChart, setLabelChart] = useState([])
  const [loading, setLoading] = useState(true)


  async function loadData() {
    await axios.get('http://localhost:3030/api/dashboard/load/infos')
      .then((res) => {
        setTotalMonthSaled(res.data.totalMonthsSaled)
        setTotalMonthInvested(res.data.totalMonthsInvested)
        setTotalRequestsInTransit(res.data.totalRequestsInTransit)
        setTotalProfitMonths(res.data.profitMonths)
        setProductsWithCriticalStock(res.data.productsWithCriticalStock)
        setTotalMonthComission(res.data.totalMonthComission)
        setLabelChart(res.data.months)

      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const optionsChartInvestedSaled = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Investimento X faturamento",
      },
    },
  };

  const dataChartInvestedSaled = {
    labels: labelChart,
    datasets: [
      {
        label: "Investimento",
        data: totalMonthInvested,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Faturamento",
        data: totalMonthSaled,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const dataChartProfit = {
    labels: labelChart,
    datasets: [
      {
        label: "Lucro líquido",
        data: totalProfitMonths,
        backgroundColor: "rgba(0, 100, 20, 0.5)",
      },
    ],
  };

  const optionsChartProfit = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Lucro líquido",
      },
    },
  }

  useEffect(() => {
    dispatch(ChangePage('dashboard'))
    loadData();
  }, [])

  if (loading) {
    return <div className={container.main}>
      <SideBar />
      <section className="w-full">
        <Header />
        <div className="w-full flex items-center justify-center">
          <Oval widht={50} />
        </div>
      </section >
    </div >
  }

  return (
    <div className={container.main}>
      <SideBar />
      <section className="w-full">
        <section className="items-start justify-center flex w-full gap-8 flex-wrap overflow-x-auto py-10">
          <div className="flex w-7/12 h-96 items-center justify-center flex-col bg-white rounded-md shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <Bar options={optionsChartInvestedSaled} data={dataChartInvestedSaled} />
          </div>
          <div className="w-4/12 flex flex-col gap-8 h-96 items-start justify-center">
            <div className="flex w-full h-full items-center text-center gap-12 justify-center flex-col bg-white rounded-md shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
              <div className="font-semibold flex">
                <p className="text-2xl px-4">Comissão a ser paga</p>
              </div>
              <div className="font-semibold">
                <p className="text-xl">R$ {totalMonthComission}</p>
              </div>
            </div>
            <a href="/dashboard/requests" className="flex w-full h-full items-center text-center gap-12 justify-center flex-col bg-white rounded-md shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
              <div className="font-semibold flex">
                <p className="text-2xl px-4">Total de pedidos em trânsito</p>
              </div>
              <div className="font-semibold">
                <p className="text-xl">{totalRequestsInTransit}</p>
              </div>
            </a>
          </div>

          <div className="flex w-7/12 h-96 items-center justify-center flex-col bg-white rounded-md shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <Bar options={optionsChartProfit} data={dataChartProfit} />
          </div>
          <div className="flex w-4/12 items-center text-center gap-12 justify-center flex-col bg-white rounded-md shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <div className="font-semibold flex">
              <p className="text-2xl m-0 p-0">Produtos com estoque crítico</p>
            </div>
            <div className="font-semibold flex w-full text-left">
              <ul className="flex flex-col w-11/12 p-2 pl-10 text-md list-disc">
                {productsWithCriticalStock.map((product) => {
                  return (
                    <li key={product.id}><a href={`/dashboard/products/${product.id}`} className="hover:underline">{product.full_name}</a></li>
                  )
                })}
              </ul>
            </div>
          </div>
        </section>
      </section >
    </div >
  );
}

export default Dashboard;
