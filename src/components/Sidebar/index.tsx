import { FaChalkboardTeacher, FaGraduationCap, FaSchool, FaUsers } from "react-icons/fa";
import { MdPieChart } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";

export default function SideBar (props:any) {

    const { navItemOffset } = props;
    const location = useLocation()

    const navList = [
        {
            label: 'dashboard',
            icon: <MdPieChart />,
            link: '/dashboard',
            active: false,
        },
        {
            label: 'schools by LGA',
            icon: <FaSchool />,
            link: '/schools-by-lga',
            active: false
        },
        {
            label: 'schools',
            icon: <FaSchool />,
            link: '/',
            active: true
        },
        {
            label: 'students',
            icon: <FaGraduationCap />,
            link: '/students',
            active: false
        },
        {
            label: 'staffs',
            icon: <FaChalkboardTeacher/>,
            link: '/staffs',
            active: false
        },
        {
            label: 'user management',
            icon: <FaUsers />,
            link: '/user-management',
            active: false
        },
        {
            label: 'reports (private schools)',
            icon: '',
            link: '',
            active: false
        },
        {
            label: 'reports (public schools)',
            icon: '',
            link: '',
            active: false
        },
    ];

    return (
        <div className={styles.container}>
            {
                navList.map((navItem:any, count:any)=> {
                    return  <Link key={count} to={navItem.link}>
                                <div 
                                    className={`
                                        ${styles.nav_item} 
                                        ${navItemOffset}
                                        ${
                                            (location.pathname === navItem.link)
                                            ? styles.active_link 
                                            :null
                                        }
                                    `}
                                >
                                    <div className={styles.icon}> { navItem.icon } </div>
                                    <div className={styles.label}> { navItem.label } </div>
                                </div>
                            </Link>
                })
            }
        </div>
    );
}
