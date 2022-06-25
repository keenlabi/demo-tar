import UserProfile from "../UserProfile";
import styles from "./header.module.css";

export default function Header() {

    const imageLogo = '';

    const detTodayDate = ()=> {
        const date = new Date();
        const literalDate = date.toLocaleDateString('en-us', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        return literalDate;
    }

    return(
        <div className={styles.container}>
            <div className={styles.logo}>
                {
                    (imageLogo) 
                    ?   <div className={styles.image_wrapper}> { imageLogo } </div>
                    :null
                }
                <div className={styles.text}>ESEMIS</div>
            </div>

            <div className={styles.date}>
                { detTodayDate() }
            </div>

            <div className={styles.user_profile_wrapper}>
                <UserProfile 
                    profileImg={""}
                    username={"Labi Lawal"}
                />
            </div>
        </div>
    );
}