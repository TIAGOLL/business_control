import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SideBar from "../../components/SideBar";
import { ChangePage } from "../../redux/features/activePage";
import { container } from "../../styles/global.css";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import axios from "axios";

// ToDo

// [   ] - Barra de pesquisa
// [ X ] - Lista de produtos
// [   ] -
// [   ] -


function Products() {
  const dispatch = useDispatch()

  const [products, setProducts] = useState([])

  async function loadProducts() {
    await axios.get('http://localhost:3030/products')
      .then(res => {
        console.log(res.data);
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
        <div className="p-4 items-start justify-center flex w-full h-[calc(100vh-100px)] gap-4 flex-wrap overflow-x-auto ">
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
