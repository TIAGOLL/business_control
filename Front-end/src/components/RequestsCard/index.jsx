import stylesRequestCard from './styles.css';
import moment from 'moment'


function RequestsCard(props) {

  return (
    <a href={`/dashboard/requests/${props.id}`} key={props.id} className={stylesRequestCard.tableLines}>
      <div className={stylesRequestCard.cellLine}>
        {props.id}
      </div>
      <div className={stylesRequestCard.cellLine}>
        {props.accounts.name}
      </div>
      <div className={stylesRequestCard.cellLine}>
        {props.accounts.platforms.name}
      </div>
      <div className={stylesRequestCard.cellLine}>
        {props.store_name}
      </div>
      <div className={stylesRequestCard.cellLine}>
        {props.tracking_id}
      </div>
      <div className={stylesRequestCard.cellLine}>
        {props.created_at}
      </div>
      <div className={stylesRequestCard.cellLine}>
        {props.active == false && <span className="bg-orange-950 p-1 w-11/12 text-center font-semibold rounded-lg">Cancelado</span>}
        {props.status_tracking.name == 'Em trânsito' && props.active == true && <span className="bg-yellow-700 p-1 w-11/12 text-center font-semibold rounded-lg">{props.status_tracking.name}</span>}
        {props.status_tracking.name == 'Entregue' && props.active == true && <span className="bg-green-700 p-1 w-11/12 text-center font-semibold rounded-lg">{props.status_tracking.name}</span>}
        {props.status_tracking.name == 'Reembolsado' && props.active == true && <span className="bg-zinc-700 p-1 w-11/12 text-center font-semibold rounded-lg">{props.status_tracking.name}</span>}
        {props.status_tracking.name == 'Esperando reembolso' && props.active == true && <span className="bg-red-700 p-1 w-11/12 text-center font-semibold rounded-lg">{props.status_tracking.name}</span>}


      </div>
    </a>
  );
}

export default RequestsCard;
