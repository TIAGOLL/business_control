import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SideBar from "../../components/SideBar";
import { ChangePage } from "../../redux/slices/activePage";
import { container } from "../../styles/global.css";



// ToDo
// [ ] - Faturamento
// [ ] - Lucro
// [ ] - Porcentagem de Lucro
// [ ] - Capital
// [ ] -


function Dashboard() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ChangePage('dashboard'))
  }, [])

  return (
    <div className={container.main}>
      <SideBar />
    </div>
  );
}

export default Dashboard;
