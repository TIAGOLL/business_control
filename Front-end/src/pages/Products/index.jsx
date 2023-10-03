import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SideBar from "../../components/SideBar";
import { ChangePage } from "../../redux/slices/activePage";
import { container } from "../../styles/global.css";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import axios from "axios";

// ToDo

// [   ] - Barra de pesquisa
// [   ] - Lista de produtos
// [   ] -
// [   ] -


function Products() {
  const dispatch = useDispatch()

  const [products, setProducts] = useState([])

  async function loadProducts() {
    const response = await axios.get('http://localhost:3030/products')

      .then(res => {
        setProducts(res.data);
      })

      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    dispatch(ChangePage('products'))
    loadProducts()
  }, [])

  return (
    <div className={container.main}>
      <SideBar />

      <section className="w-full">
        <Header />
        <div className="p-16 flex w-full h-full gap-4">
          {
            products.map(({ id, ...rest }) => (
              <ProductCard key={id} id={id} {...rest} />
            ))
          }
        </div>
      </section>
    </div>
  );
}

export default Products;
