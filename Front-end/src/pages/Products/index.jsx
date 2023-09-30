import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SideBar from "../../components/SideBar";
import { ChangePage } from "../../redux/slices/activePage";
import { container } from "../../styles/global.css";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";

// ToDo

// [   ] - Barra de pesquisa
// [   ] - Lista de produtos
// [   ] -
// [   ] -


function Products({ data }) {
  const dispatch = useDispatch()

  const [products, setProducts] = useState([])


  useEffect(() => {
    dispatch(ChangePage('products'))
  }, [])

  return (
    <div className={container.main}>
      <SideBar />

      <section className="w-full">
        <Header />
        <div className="p-16 flex w-full h-full">
          <ProductCard />
        </div>
        {
          products.map((product) => (
            <div>
              <div>
                {product.nome}
              </div>
              <div>
                {product.preco_venda}
              </div>
              <div>
                {product.qtd}
              </div>
              <div>
                {product.preco_compra}
              </div>
            </div>
          )
          )
        }
      </section>
    </div>
  );
}

export default Products;
