import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import styles from "./dropdown.module.css";

export default function DropDown (props:any) {

    const { position, options, selectedOptionIndex, isSelected, openMenu, isOptionsVisibile, select, childRef } = props;

    return (
        <div className={styles.container} ref={childRef}>
            <div className={styles.display} onClick={()=> openMenu(position) }>
                <div className={styles.display_option}>
                    { 
                        (isSelected)
                        ?   options[selectedOptionIndex].label
                        :   'All Categories'
                    }
                </div>
                {
                    (isOptionsVisibile)
                    ? <FaCaretUp />
                    : <FaCaretDown />
                }
            </div>

            {
                (isOptionsVisibile)
                ?   <div className={styles.options} style={{ zIndex: position }}>
                        {
                            options.map((option:any, count:any)=> {
                                return  <div 
                                            key={count}
                                            className={styles.option}
                                            onClick={()=>   { 
                                                                openMenu(position)
                                                                select(count) 
                                                            }
                                                    }
                                        >
                                            { option.label }
                                        </div>
                            })
                        }
                    </div>
                :null
            }
        </div>
    );
}