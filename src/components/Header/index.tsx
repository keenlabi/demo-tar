import styles from "./header.module.css";

export default function Header() {
    return(
        <div className={styles.container}>
            <div className={styles.logo}></div>
        </div>
    );
}