import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { container } from "../../styles/styles.css";
import SideBar from "../../components/SideBar";
import { ChangePage } from "../../redux/slices/activePage";


// ToDo

// [ ] - Nome
// [ ] - Codigo
// [ ] - Preço de venda
// [ ] - Preço de compra
// [ ] - % de lucro
// [ ] - Quantidade
// [ ] -
// [ ] -


function Products() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ChangePage('products'))
  }, [])

  return (
    <div className={container.main}>
      <SideBar />
    </div>
  );
}

export default Products;
