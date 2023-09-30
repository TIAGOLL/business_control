import { useParams } from "react-router-dom";
import { productCard } from "./styles.css";
import { useEffect } from "react";

function ProductCard() {

  const { id } = useParams()

  const loadProduct = async () => {

  }


  useEffect(() => {
    loadProduct()
  }, [])

  return (
    <a href={`/dashboard/products/${id}`} className={productCard.container} >

      <div className={productCard.image}>
        <img className="rounded-2xl" src="https://images-americanas.b2w.io/produtos/4475559609/imagens/fone-de-ouvido-bluetooth-i12-tws-sem-fio-touch-recarregavel/4475559617_1_large.jpg" alt="Foto do produto" />
      </div>

      <div className={productCard.tittle}>
        Fone i12
        {/* {product.name} */}
      </div>

      <div className={productCard.info}>
        Preço: <span className="font-semibold">R$60,00</span>
        {/* {product.price} */}
      </div>

      <div className={productCard.info}>
        Quantidade: <span className="font-semibold">10</span>
        {/* {product.quantity} */}
      </div>
    </a>
  );
}

export default ProductCard;
