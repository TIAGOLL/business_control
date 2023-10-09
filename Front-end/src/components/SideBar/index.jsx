import { BarChartBig, PackageSearch, Power, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sideBar } from "./styles.css";


const SideBar = () => {

  const navigate = useNavigate()


  function desconnectUser() {
    // localStorage.removeItem('@ticketsPRO');
    // navigate('/')
  }

  const { page } = useSelector(state => state.page)

  return (
    <>
      <aside className="h-screen w-20 flex flex-col text-zinc-300 group hover:transition-all hover:w-2/12">
        <div className="flex w-full flex-col h-full relative bg-slate-800 py-6">
          <nav className="space-y-8 text-lg">
            <div className="justify-center text-center flex flex-col items-center mb-20">
              <img src='/images/Logo.png' alt="Imagem de Perfil" className="border-4 rounded-full w-12 border-sky-900" />
              <span className="font-semibold pt-3 text-lg">Tinny</span>
            </div>
            <div className="flex flex-col space-y-2 items-center group-hover:items-stretch">

              {/* Dashboard */}
              <a href="/dashboard" className={page == 'dashboard' ? sideBar.activeLink.complete : sideBar.inactiveLink.complete}><BarChartBig /> Dashboard</a>

              <a href="/dashboard" className={page == 'dashboard' ? sideBar.activeLink.short : sideBar.inactiveLink.short}><BarChartBig /></a>

              {/* Home */}
              <a href="/dashboard/requests" className={page == 'requests' ? sideBar.activeLink.complete : sideBar.inactiveLink.complete}><ShoppingCart />Pedidos</a>

              <a href="/dashboard/requests" className={page == 'requests' ? sideBar.activeLink.short : sideBar.inactiveLink.short}><ShoppingCart /></a>

              {/* Product */}
              <a href="/dashboard/products" className={page == 'products' ? sideBar.activeLink.complete : sideBar.inactiveLink.complete}><PackageSearch /> Produtos</a>

              <a href="/dashboard/products" className={page == 'products' ? sideBar.activeLink.short : sideBar.inactiveLink.short}><PackageSearch /></a>

              {/* Disconect */}
              <div className="flex flex-col absolute bottom-2">
                <button onClick={(e) => desconnectUser(e)} className={sideBar.inactiveLink.complete}><Power />Desconectar</button>
              </div>

              <div className="flex flex-col absolute bottom-2 justify-center items-center w-full">
                <button onClick={(e) => desconnectUser(e)} className={sideBar.inactiveLink.short}><Power /></button>
              </div>
            </div>
          </nav>
        </div >
      </aside >
    </>
  )
}

export default SideBar;
