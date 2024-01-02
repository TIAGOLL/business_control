import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ChangePage } from "../../redux/features/activePage";
import { container, formStyle } from "../../styles/global.css";
import axios from "axios";
import { Oval } from 'svg-loaders-react';
import ProductCard from './../../components/ProductCard/index';
import Header from './../../components/Header/index';
import SideBar from './../../components/SideBar/index';
import { Search } from "lucide-react";

function Products() {
  const dispatch = useDispatch()
  dispatch(ChangePage('products'))

  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('actives')
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([])

  async function loadData() {
    await axios.get(`http://localhost:3030/api/products/load/${filter}`)
      .then((res) => {
        setData(res.data)
        setSearchData(res.data.products)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
<<<<<<< HEAD
    dispatch(ChangePage('products'))
    loadProducts();
  }, [])
=======
    if (!loading) {
      setSearchData(data.products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.prod_categories.name.toLowerCase().includes(search.toLowerCase()) ||
        item.color.toLowerCase().includes(search.toLowerCase())
      ))
    }
  }, [search])

  useEffect(() => {
    loadData();
  }, [filter])

  if (loading) {
    return (
      <div className={container.main}>
        <SideBar />
        <section className="w-full items-center justify-center flex flex-col">
          <Header />
          <fieldset className="w-10/12 border-2 bg-zinc-200 p-4 shadow-md rounded-xl border-zinc-500 flex flex-row justify-center items-center gap-10 font-semibold text-md">
            <div className="gap-2 flex">
              <input type="radio" name="filter" id="filterActive" value='actives' onChange={(e) => setFilter(e.target.value)} />
              <label htmlFor="filterActive">Ativos</label>
            </div>
            <div className="gap-2 flex">
              <input type="radio" name="filter" id="filterAvaibles" value='avaibles' onChange={(e) => setFilter(e.target.value)} />
              <label htmlFor="filterAvaibles">Disponíveis</label>
            </div>
            <div className="gap-2 flex">
              <input type="radio" name="filter" id="filterInTransit" value='intransit' onChange={(e) => setFilter(e.target.value)} />
              <label htmlFor="filterInTransit">Em trânsito</label>
            </div>
            <div className="gap-2 flex">
              <input type="radio" name="filter" id="filterDeleted" value='deleted' onChange={(e) => setFilter(e.target.value)} />
              <label htmlFor="filterDeleted">Deletados</label>
            </div>

            <div className="gap-2 w-20 h-10 flex">
              <button onClick={() => loadData()} className={formStyle.blueButton}>{loading ? <Oval width={20} strokeWidth={40} /> : <Search width={20} height={20} />}</button>
            </div>
          </fieldset>
          <div className="p-4 items-start justify-center flex w-full h-[calc(100vh-100px)] gap-4 flex-wrap overflow-x-auto ">
            <Oval />
          </div>
        </section>
      </div>
    )
  }
>>>>>>> 47974382efdaad48d2939a038e2b7628c69b500d

  return (
    <div className={container.main}>
      <SideBar />
      <section className="w-full items-center justify-center flex flex-col">
        <Header />
        <fieldset className="w-10/12 border-2 bg-zinc-200 p-4 shadow-md rounded-xl border-zinc-500 flex flex-row justify-center items-center gap-10 font-semibold text-md">
          <div className="gap-2 flex">
            <input type="search" id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className={formStyle.input} />
          </div>
          <div className="gap-2 flex">
            <input type="radio" name="filter" id="filterActive" checked={filter == 'actives'} value='actives' onChange={(e) => setFilter(e.target.value)} />
            <label htmlFor="filterActive">Ativos</label>
          </div>
          <div className="gap-2 flex">
            <input type="radio" name="filter" id="filterAvaibles" value='avaibles' onChange={(e) => setFilter(e.target.value)} />
            <label htmlFor="filterAvaibles">Disponíveis</label>
          </div>
          <div className="gap-2 flex">
            <input type="radio" name="filter" id="filterInTransit" value='intransit' onChange={(e) => setFilter(e.target.value)} />
            <label htmlFor="filterInTransit">Em trânsito</label>
          </div>
          <div className="gap-2 flex">
            <input type="radio" name="filter" id="filterDeleted" value='deleted' onChange={(e) => setFilter(e.target.value)} />
            <label htmlFor="filterDeleted">Deletados</label>
          </div>
        </fieldset>
        <div className="p-4 items-start justify-center flex w-full h-[calc(100vh-172px)] gap-4 flex-wrap overflow-x-auto ">
          {
            searchData.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))
          }
        </div>
      </section>
    </div>

  );
}

export default Products;
