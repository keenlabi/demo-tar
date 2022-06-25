import styles from "./radioinput.module.css"

export default function CheckBox(props:any) {

    const { index, label, isSelected, select } = props

    return (
        <div className={styles.container}>
            <div 
                className={`
                    ${styles.check_box}
                    ${
                        (isSelected)
                        ?styles.selected
                        :null
                    }
                `}
                onClick={()=> select(index)}
            >
                {
                    (isSelected)
                    ? <div className={styles.icon}></div>
                    :null
                }
            </div>
            <div className={styles.label}>{ label }</div>
        </div>
    );
}