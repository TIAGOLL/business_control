import { BadgeDollarSign, BarChartBig, PackageSearch, Power, ShieldAlert, ShoppingCart, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sideBar } from "./styles.css";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";


const SideBar = () => {

  const navigate = useNavigate()
  const { user } = useContext(AuthContext);

  function desconnectUser() {
    localStorage.removeItem('@ticketsPRO');
    navigate('/')
    toast.warn('Desconectado com sucesso!')
  }
  const { page } = useSelector(state => state.page)
  return (
    <aside className="h-screen w-20 flex flex-col text-zinc-300 group hover:transition-all hover:w-2/12">
      <div className="flex w-full flex-col h-full relative bg-slate-800 py-6">
        <nav className="space-y-8 text-lg">
          <div className="justify-center text-center flex flex-col items-center">
            <img src={user.avatarUrl ? user.avatarUrl : "https://lh3.googleusercontent.com/a/ACg8ocK-mku48pjy9EarPehX3hHE5s6vBPTzkQCCNauOBK3LnNQ=s96-c"} alt="Imagem de Perfil" className="border-4 rounded-full w-8 border-sky-900" />
            <span className="font-semibold pt-2 text-md">{user.name ? user.name : user.nome}</span>
          </div>
          <div className="flex flex-col space-y-2 items-center group-hover:items-stretch">

            {/* Dashboard */}
            <a href="/dashboard" className={page == 'dashboard' ? sideBar.activeLink.complete : sideBar.inactiveLink.complete}><BarChartBig /> Dashboard</a>

            <a href="/dashboard" className={page == 'dashboard' ? sideBar.activeLink.short : sideBar.inactiveLink.short}><BarChartBig /></a>

            {/* Requests */}
            <a href="/dashboard/requests" className={page == 'requests' ? sideBar.activeLink.complete : sideBar.inactiveLink.complete}><ShoppingCart />Pedidos</a>

            <a href="/dashboard/requests" className={page == 'requests' ? sideBar.activeLink.short : sideBar.inactiveLink.short}><ShoppingCart /></a>

            {/* Product */}
            <a href="/dashboard/products" className={page == 'products' ? sideBar.activeLink.complete : sideBar.inactiveLink.complete}><PackageSearch /> Produtos</a>

            <a href="/dashboard/products" className={page == 'products' ? sideBar.activeLink.short : sideBar.inactiveLink.short}><PackageSearch /></a>

            {/* Sales */}
            <a href="/dashboard/sales" className={page == 'sales' ? sideBar.activeLink.complete : sideBar.inactiveLink.complete}><BadgeDollarSign /> Vendas</a>

            <a href="/dashboard/sales" className={page == 'sales' ? sideBar.activeLink.short : sideBar.inactiveLink.short}><BadgeDollarSign /></a>

            {/* Clients */}
            <a href="/dashboard/clients" className={page == 'clients' ? sideBar.activeLink.complete : sideBar.inactiveLink.complete}><Users /> Clientes</a>

            <a href="/dashboard/clients" className={page == 'clients' ? sideBar.activeLink.short : sideBar.inactiveLink.short}><Users /></a>

            {/* admin */}
            <a href="/dashboard/admin" className={page == 'admin' ? sideBar.activeLink.complete : sideBar.inactiveLink.complete}><ShieldAlert /> Admin</a>

            <a href="/dashboard/admin" className={page == 'admin' ? sideBar.activeLink.short : sideBar.inactiveLink.short}><ShieldAlert /></a>

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
  )
}

export default SideBar;
