import { useEffect, useState } from "react";
import { productCard } from "./styles.css";
import axios from "axios";

function ProductCard(props) {

  const [currentProduct, setCurrentProduct] = useState({
    quantity: '',
    name: props.name,
    sale_price: props.sale_price,
  })


  async function loadData() {
    await axios.get(`http://localhost:3030/products/stock/${props.id}`)
      .then(res => {
        currentProduct.quantity = res.data
        setCurrentProduct({ ...currentProduct });
        return
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <a href={`/dashboard/products/${props.id}`} key={props.id} className={productCard.container} >
      <div className={productCard.image}>
        {props.id == 200 && <img className="rounded-2xl w-40 h-40" src="../../../public/images/headset.jpg" alt="Foto do produto" />}
        {props.id == 201 && <img className="rounded-2xl w-40 h-40" src="../../../public/images/relogio.jpg" alt="Foto do produto" />}
        {props.id == 202 && <img className="rounded-2xl w-40 h-40" src="../../../public/images/mouse.jpg" alt="Foto do produto" />}
      </div>

      <div className={productCard.tittle}>
        {currentProduct.name}
      </div>

      <div className={productCard.info}>
        Preço: <span className="font-semibold">R${currentProduct.sale_price}</span>
      </div>

      <div className={productCard.info}>
        Estoque Físico: <span className="font-semibold">{currentProduct.quantity}</span>
      </div>
    </a>
  );
}

export default ProductCard;
