import { productCard } from "./styles.css";

function ProductCard(props) {

  return (
    <a href={`/dashboard/products/${props.id}`} className={productCard.container} >

      <div className={productCard.image}>
        <img className="rounded-2xl" src="https://images-americanas.b2w.io/produtos/4475559609/imagens/fone-de-ouvido-bluetooth-i12-tws-sem-fio-touch-recarregavel/4475559617_1_large.jpg" alt="Foto do produto" />
      </div>

      <div className={productCard.tittle}>
        {props.nome}
      </div>

      <div className={productCard.info}>
        Preço: <span className="font-semibold">R${props.preco_compra}</span>
      </div>

      <div className={productCard.info}>
        Quantidade: <span className="font-semibold">{props.qtd}</span>
      </div>
    </a>
  );
}

export default ProductCard;
