import { Link } from "react-router-dom";
import styles from "./datatable.module.css";

export default function DataTable(props:any) {
    const { headings, body } = props;

    return (
        <div className={styles.container}>
            <div className={`${styles.heading_row}`}>
                {
                    headings.map((heading:any, count:any)=> {
                        return  <div key={count} className={styles.heading} style={{gridTemplateColumns: headings.length}}>
                                    <div className={styles.heading_content}>{ heading }</div>
                                </div>
                    })
                }
            </div>
            <div className={styles.body}>
                {
                    body.map((bodyRow:any, rowCount:any)=> {
                        return  <Link to={`schools/${bodyRow.id}`} key={rowCount}>
                                    <div className={styles.body_row} >
                                        {
                                            bodyRow.list.map((eachRowCell:any, cellCount:any)=> {
                                                return  <div key={cellCount} className={styles.body_row_cell}> 
                                                            <div className={styles.body_row_cell_content}>{ eachRowCell } </div>
                                                        </div>
                                            })
                                        }
                                    </div>
                                </Link>
                    })
                }
            </div>
        </div>
    );
}