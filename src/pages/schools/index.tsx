import SchoolsDataTable from "../../components/SchoolsDataTable";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import styles from "./schools.module.css";

export default function Schools(props:any) {
    
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.body}>
                <aside className={styles.sidebar_wrapper}>
                    <SideBar navItemOffset={styles.nav_item_offset} />
                </aside>
                <div className={styles.page_content}>
                    <SchoolsDataTable />
                </div>
            </div>
        </div>
    );
}