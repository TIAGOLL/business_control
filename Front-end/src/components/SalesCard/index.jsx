
import stylesSalesCard from './styles.css';
function SalesCard(props) {
  console.log(props)
  return (
    <a href={`/dashboard/sales/${props.id}`} key={props.id} className={stylesSalesCard.tableLines}>
      <div className={stylesSalesCard.cellLine}>
        {props.id}
      </div>
      <div className={stylesSalesCard.cellLine}>
        {props.clients.name}
      </div>
      <div className={stylesSalesCard.cellLine}>
        {props.collaborators.name}
      </div>
      <div className={stylesSalesCard.cellLine}>
        {new Date(props.created_at).toLocaleDateString('pt-br') + ' ' + new Date(props.created_at).toLocaleTimeString('pt-br')}
      </div>
      <div className={stylesSalesCard.cellLine}>
        {props.paid == true && <span className="bg-green-700 p-1 w-11/12 text-center font-semibold rounded-lg">Pago</span>}
        {props.paid == false && <span className="bg-red-700 p-1 w-11/12 text-center font-semibold rounded-lg">Não pago</span>}
      </div>
    </a>
  );
}

export default SalesCard;
