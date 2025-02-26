import styles from './Item.module.scss';
import { MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Item({ data, ...props }) {
    const locale = 'fi-FI';
    const date = new Date(data.date).toLocaleDateString(locale);
    const duration = data.amount ? `${data.amount} min, liikuntaa suoritettu!` : 'liikunta suoritettu!';

    return (
        <div className={styles.item}>
            <div className={styles.item_data}>
                <div className={styles.item_type}>{data.type}</div>
                <div className={styles.item_amount}>{duration}</div>
                <div className={styles.item_date}>{date}</div>
                <div className={styles.item_length}>{data.length}</div>
            </div>
            <div className={styles.item_edit}>
                <Link to={'/edit/' + data.id}>
                    <MdNavigateNext />
                </Link>
            </div>
        </div>
    );
}

export default Item;