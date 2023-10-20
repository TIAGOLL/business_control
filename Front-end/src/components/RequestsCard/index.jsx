
import { container } from '../../styles/global.css';
import stylesRequestCard from './styles.css';
import moment from 'moment'


function RequestsCard(props) {

  console.log(props)

  return (
    <a href={`/dashboard/requests/${props.id}`} key={props.id} className={stylesRequestCard.tableLines}>
      <div className={stylesRequestCard.cellLine}>
        {props.id}
      </div>
      <div className={stylesRequestCard.cellLine}>
        {props.account.name}
      </div>
      <div className={stylesRequestCard.cellLine}>
        {props.account.platform.name}
      </div>
      <div className={stylesRequestCard.cellLine}>
        {props.store_name}
      </div>
      <div className={stylesRequestCard.cellLine}>
        {props.tracking_id}
      </div>
      <div className={stylesRequestCard.cellLine}>
        {moment(props.date).format('DD/MM/YYYY')}
      </div>
      <div className={stylesRequestCard.cellLine}>
        {props.status_tracking.name == 'Em trânsito' && <span className="bg-yellow-700 p-1 w-11/12 text-center font-semibold rounded-lg">{props.status_tracking.name}</span>}
        {props.status_tracking.name == 'Entregue' && <span className="bg-green-700 p-1 w-11/12 text-center font-semibold rounded-lg">{props.status_tracking.name}</span>}
        {props.status_tracking.name == 'Reembolsado' && <span className="bg-zinc-700 p-1 w-11/12 text-center font-semibold rounded-lg">{props.status_tracking.name}</span>}
        {props.status_tracking.name == 'Esperando reembolso' && <span className="bg-red-700 p-1 w-11/12 text-center font-semibold rounded-lg">{props.status_tracking.name}</span>}
      </div>
    </a>
  );
}

export default RequestsCard;
