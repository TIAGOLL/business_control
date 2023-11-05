import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SideBar from "../../components/SideBar";
import { ChangePage } from "../../redux/features/activePage";
import { container } from "../../styles/global.css";
import Header from "../../components/Header";
import axios from "axios";



// ToDo
// [ ] - Faturamento
// [ ] - Lucro
// [ ] - Porcentagem de Lucro
// [ ] - Capital
// [ ] -


function Dashboard() {

  const dispatch = useDispatch()

  const [totalInvested, setTotalInvested] = useState()
  const [products, setProducts] = useState([])
  const [profit, setProfit] = useState()
  const [billing, setBilling] = useState(920)
  const [requestsInTransit, setRequestsInTransit] = useState([])

  async function loadData() {
    await axios.get('http://localhost:3030/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    await axios.get('http://localhost:3030/totalinvested')
      .then(res => {
        setTotalInvested(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    await axios.get('http://localhost:3030/req/intransit')
      .then(res => {
        setRequestsInTransit(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    dispatch(ChangePage('dashboard'))
    loadData();
  }, [])

  return (
    <div className={container.main}>
      <SideBar />
      <section className="w-full">
        <Header />
        <div className="px-24 items-start justify-center flex w-full gap-8 flex-wrap">
          <div className="flex w-3/12 h-56 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <div className="font-semibold flex">
              <p className="text-3xl px-4">Faturamento total</p>
            </div>
            <div className="font-semibold">
              <p className="text-xl">R$ {billing}.00</p>
            </div>
          </div>
          <div className="flex w-3/12 h-56 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <div className="font-semibold flex">
              <p className="text-3xl px-4">Investimento total</p>
            </div>
            <div className="font-semibold">
              <p className="text-xl">R$ {totalInvested}</p>
            </div>
          </div>
          <div className="flex w-3/12 h-56 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <div className="font-semibold flex">
              <p className="text-3xl px-4">Lucro total</p>
            </div>
            <div className="font-semibold">
              <p className="text-xl">R$ {billing - totalInvested}</p>
            </div>
          </div>
          <div className="flex w-3/12 h-56 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <div className="font-semibold flex">
              <p className="text-3xl px-4">Total de produtos ativos</p>
            </div>
            <div className="font-semibold">
              <p className="text-xl">{products.length}</p>
            </div>
          </div>
          <div className="flex w-3/12 h-56 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <div className="font-semibold flex">
              <p className="text-3xl px-4">Total de pedidos em trânsito</p>
            </div>
            <div className="font-semibold">
              <p className="text-xl">{requestsInTransit.length}</p>
            </div>
          </div>
          <div className="flex w-3/12 h-56 items-center text-center gap-12 justify-center flex-col bg-white rounded-xl shadow-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
            <div className="font-semibold flex">
              <p className="text-3xl px-4">Produtos com estoque crítico</p>
            </div>
            <div className="text-xl font-semibold">
              <ol className="list-disc">
                <li>Fone de ouvido</li>
                <li>Relógio</li>
              </ol>
            </div>
          </div>

        </div>
      </section >
    </div >
  );
}

export default Dashboard;
