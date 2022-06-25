import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import defaultProfilePicuture from "./user.png";
import styles from "./userprofile.module.css";


export default function UserProfile(props:any) {
    const { profileImg, username } = props;

    const [isMenuOpen, toggleIsMenuOpen] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.container_entry} onClick={()=> toggleIsMenuOpen(!isMenuOpen)} >
                <div className={styles.profile_image_wrapper}>
                    <img 
                        src={
                            (profileImg)
                            ? profileImg
                            : defaultProfilePicuture
                        } 
                        alt="profile" 
                        className={styles.image}
                    />
                </div>
                <div className={styles.username}>
                    { username }
                </div>
                <div className={styles.icon}>
                    {
                        (isMenuOpen)
                        ? <FaCaretUp />
                        : <FaCaretDown />
                    }
                </div>
            </div>

            {
                (isMenuOpen)
                ?   <div className={styles.menu}>
                        <div className={styles.menu_item}>Logout</div>
                    </div>
                :null
            }
        </div>
    );
}

