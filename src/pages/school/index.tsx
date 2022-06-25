import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebaseconfig";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "../../components/Sidebar";
import Header from "../../components/Header";
import { FaArrowLeft } from "react-icons/fa";
import schoolLogo from "./schoolimage.jpg" 
import styles from "./school.module.css";
import SwingingDotsLoader from "../../components/SwingingDotsLoader";

export default function School(props:any) {

    const navigate = useNavigate();
    const { schoolId } = useParams();

    const [schoolData, setSchoolData]:any = useState({});
    const schoolDocumentRef = doc(db, 'schools', schoolId!);

    useEffect(()=> {
        const getSchool = async ()=> {
            const response = await getDoc(schoolDocumentRef);
            setSchoolData({...response.data()});
        }

        getSchool();
    },[schoolDocumentRef]);

    const detDate = (dateInString:string)=> {
        console.log(dateInString);

        const day = parseInt(dateInString.split('/')[0])
        const month = parseInt(dateInString.split('/')[1])
        const year = parseInt(dateInString.split('/')[2])

        const date = new Date(day, month, year).toLocaleDateString('en-us', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        return date
    }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.body}>
                <aside className={styles.sidebar_wrapper}>
                    <SideBar navItemOffset={styles.nav_item_offset} />
                </aside>
                <div className={styles.page_content}>
                    <div className={styles.back_icon_wrapper}>
                        <FaArrowLeft onClick={()=> navigate("/") } />
                    </div>
                    {/* <div className={}>

                    </div> */}
                    {
                        (Object.keys(schoolData).length === 0)
                        ?   <div className={styles.loader_wrapper}><SwingingDotsLoader /></div>
                        :   <div className={styles.page_heading}>    
                                <div className={styles.title}>    
                                    <div className={styles.school_logo}>
                                        <img src={schoolLogo} alt="school logo" />
                                    </div>
                                    <div className={styles.school_info}>
                                        <div className={styles.school_name}>{ schoolData.name }</div>
                                        <div className={styles.meta_info}>
                                            <div className={styles.date_of_est}>
                                                <div className={styles.date}>{ schoolData.type } School</div>
                                            </div>
                                            <div className={styles.date_of_est}>
                                                <div className={styles.label}>since:</div>
                                                <div className={styles.date}>{ detDate(schoolData.date) }</div>
                                            </div>
                                            <div className={styles.date_of_est}>
                                                <div className={styles.label}>NEMIS:</div>
                                                <div className={styles.date}>{ schoolData.nemisCode }</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>                        
            </div>1
        </div>
    );

}