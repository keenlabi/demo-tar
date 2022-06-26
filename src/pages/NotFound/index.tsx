import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"
import styles from './notfound.module.css';

export default function NotFound () {
    return (
        <div className={styles.container}>
            <div className={styles.notfound_message}> 
                <div className={styles.message}>404 | Page doesn't exist</div>
                <Link to={`/`} className={styles.link}>
                    <div className={styles.working_page_link}>
                        Go to working page
                        <FaArrowRight />
                    </div>
                </Link>
            </div>
        </div>
    );
}