
import AvaibColorsCard from "../AvaibColorsCard/index";
import { productCard } from "./styles.css";

function ProductCard(props) {
  if (props.prod_requests) {
    return (
      props.prod_requests.map((item) => {
        return (
          <a href={`/dashboard/products/${item.products_id}`} key={item.products_id} className={productCard.container} >
            <div className={productCard.image}>
              <img className="rounded-2xl" width={180} src="https://images-americanas.b2w.io/produtos/4475559609/imagens/fone-de-ouvido-bluetooth-i12-tws-sem-fio-touch-recarregavel/4475559617_1_large.jpg" alt="Foto do produto" />
              <div className={productCard.info + ' !flex-col !items-start'}>
                Cores: <span className="font-semibold">{item.color}</span>
              </div>
            </div>

            <div className={productCard.tittle}>
              {item.products.name}
            </div>

            <div className={productCard.info}>
              Preço: <span className="font-semibold">R${item.products.sale_price.toFixed(2)}</span>
            </div>
          </a>
        )
      })

    )
  }

  return (
    <a href={`/dashboard/products/${props.id}`} key={props.id} className={productCard.container} >
      <div className={productCard.image}>
        <img className="rounded-2xl" width={180} src="https://images-americanas.b2w.io/produtos/4475559609/imagens/fone-de-ouvido-bluetooth-i12-tws-sem-fio-touch-recarregavel/4475559617_1_large.jpg" alt="Foto do produto" />
        <div className={productCard.info + ' !flex-wrap !items-start'}>
          {
            props.prod_colors.length > 0 &&
            <span className="font-semibold">{props.prod_colors.map((item) => {
              if (item.quantity > 0) {
                return <AvaibColorsCard key={item.id} {...item} />
              }
            }
            )}</span>
          }


        </div>
      </div>

      <div className={productCard.tittle}>
        {props.name}
      </div>

      <div className={productCard.info}>
        Preço: <span className="font-semibold">R${props.sale_price.toFixed(2)}</span>
      </div>


    </a>
  );

}

export default ProductCard;
