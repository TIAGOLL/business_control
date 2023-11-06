import { useDispatch } from "react-redux";
import { container } from "../../styles/global.css";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { useEffect } from "react";
import { ChangePage } from "../../redux/features/activePage";



function Sales() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ChangePage('admin'))
  }, [])

  return (
    <div className={container.main}>
      <SideBar />
      <div className="w-full items-center justify-center flex flex-col">
        <section>

        </section>
      </div>
    </div >
  );
}

export default Sales;
