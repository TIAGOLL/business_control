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
        <img className="rounded-2xl" src="https://images-americanas.b2w.io/produtos/4475559609/imagens/fone-de-ouvido-bluetooth-i12-tws-sem-fio-touch-recarregavel/4475559617_1_large.jpg" alt="Foto do produto" />
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
