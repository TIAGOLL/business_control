
import { productCard } from "./styles.css";

function ProductCard(props) {
  console.log(props)
  if (props.prod_requests) {
    return (
      props.prod_requests?.map((item) => {
        return (
          <a href={`/dashboard/products/${item.products_id}`} key={item.products_id} className={productCard.container} >
            <div className={productCard.image}>
              <img className="rounded-2xl w-24" width={180} src={item.products.photo_url || '/images/empty.png'} alt="Foto do produto" />
            </div>

            <div className={productCard.tittle}>
              {item.products.name}
            </div>

            <div className={productCard.info}>
              Preço: <span className="font-semibold">R${item.products.sale_price.toFixed(2)}</span>
            </div>
            <div className={productCard.info}>
              Quantidade: <span className="font-semibold">{item.quantity}</span>
            </div>
          </a>
        )
      })
    )
  }

  return (
    <a href={`/dashboard/products/${props.id}`} key={props.id} className={productCard.container} >
      <div className={productCard.image}>
        <img className="rounded-2xl w-28" src={props.photo_url ? props.photo_url : '/images/empty.png'} alt="Foto do produto" />
      </div>

      <div className={productCard.tittle}>
        {props.name}
      </div>

      <div className={productCard.info}>
        Preço: <span className="font-semibold">R${props.sale_price.toFixed(2)}</span>
      </div>

      <div className={productCard.info}>
        Estoque: <span className="font-semibold">{props.quantity}</span>
      </div>


    </a>
  );

}

export default ProductCard;
