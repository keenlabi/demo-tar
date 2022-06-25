import { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseconfig"
import { FaSearch } from "react-icons/fa";
import CheckBox from "../RadioInput";
import DataTable from "../DataTable";
import DropDown from "../DropDown";
import styles from "./schoolsdatatable.module.css";

export default function SchoolsDataTable() {

    const categoryRef = useRef<HTMLDivElement>(null);
    const lgaRef = useRef<HTMLDivElement>(null);

    const [categories, setCategories] = useState({
        selectedOptionIndex: null,
        isSelected: false,
        isOptionsVisible: false,
        options: [
            {
                label: 'Traditional public school',
                selected: false
            },
            {
                label: 'Charter school',
                selected: false
            },
            {
                label: 'Magnet school',
                selected: false
            },
            {
                label: 'Public virtual (or online) school',
                selected: false
            }
        ]
    });

    const [schoolTypes, setSchoolTypes] = useState([
        {
            label: 'all',
            selected: true
        },
        {
            label: 'private',
            selected: false
        },
        {
            label: 'public',
            selected: false
        }
    ]);

    const [locations, setLocations] = useState([
        {
            label: 'all',
            selected: true
        },
        {
            label: 'rural',
            selected: false
        },
        {
            label: 'urban',
            selected: false
        }
    ]);

    const [lga, setLGA] = useState({
        selectedOptionIndex: null,
        isSelected: false,
        isOptionsVisible: false,
        options: [
            {
                label: 'Alimosho',
                selected: false
            },
            {
                label: 'Ajeromi-Ifelodun',
                selected: false
            },
            {
                label: 'Kosofe',
                selected: false
            },
            {
                label: 'Mushin',
                selected: false
            },
            {
                label: 'Oshodi-Isolo',
                selected: false
            },
            {
                label: 'Lagos Island',
                selected: false
            },
            {
                label: 'Epe',
                selected: false
            },
            {
                label: 'Ibeju-Lekki',
                selected: false
            },
        ]
    });

    const toggleOptionsVisibility = (position:any)=> {
        dropDownList.forEach((item:any, count:any)=> {  
            if(count === position) dropDownList[position] = !dropDownList[position]
            else dropDownList[count] = false;
        });

        setDropDownList([...dropDownList]);
    }

    const [dropDownList, setDropDownList] = useState([
        false,
        false
    ]);

    const selectOption = (index:any, options:any, optionsTitle:any)=> {
        if(optionsTitle === 'school-types') {
            const newOptions = setNewOption(index, options);
            setSchoolTypes([...newOptions]);
            filterBySchoolType(options[index].label);
        }

        if(optionsTitle === 'locations') {
            const newOptions = setNewOption(index, options);
            setLocations([...newOptions]);
            filterByLocation(options[index].label);
        }

        if(optionsTitle === 'categories') {
            categories.options.forEach((schoolType:any)=> {
                schoolType.selected = false;
            });
            categories.options[index].selected = true;
            categories.selectedOptionIndex = index;
            categories.isSelected = true;

            setCategories({...categories});
            filterByCategory(categories.options[index].label);
        }

        if(optionsTitle === 'lga') {
            lga.options.forEach((schoolType:any)=> {
                schoolType.selected = false;
            });
            lga.options[index].selected = true;
            lga.selectedOptionIndex = index;
            lga.isSelected = true;

            setLGA({...lga});
            filterByLGA(lga.options[index].label);
        }
    }

    const setNewOption = (index:any, options:any)=> {
        options.forEach((option:any)=> option.selected = false);
        options[index].selected = true;
        return options;
    }

    const [tableData, setTableData]:any = useState({
        heading: ['name', 'NEMIS code', 'LGA', 'location', 'type', 'category'],
        body: []
    });

    const [filteredData, setFilteredData]:any = useState([]);

    const filterBySearchKeyword = (keyword:any)=> {
        filteredData.splice(0, filteredData.length);

        tableData.body.map((bodyItem:any)=> bodyItem.list.forEach((item:any)=> {
            if(item.toString().search(keyword) !== -1 && !filteredData.includes(bodyItem)) {
                filteredData.push(bodyItem)
            }
        }));

        setFilteredData([...filteredData]);
    }

    const filterByCategory = (selectedCategory:any)=> {
        const dataToFilter =    (filteredData.length > 0)
                                ? filteredData
                                : tableData.body

        filteredData.splice(0, filteredData.length);
        setFilteredData([...filteredData]);

        dataToFilter.map((bodyItem:any) => (bodyItem.list[5].toLowerCase() === selectedCategory.toLowerCase())
            ?   filteredData.push(bodyItem)
            :   null
        );

        setFilteredData([...filteredData]);
    }

    const filterBySchoolType = (selectedSchoolType:any)=> {
        const dataToFilter =    (filteredData.length > 0)
                                ? filteredData
                                : tableData.body

        filteredData.splice(0, filteredData.length);
        setFilteredData([...filteredData]);

        dataToFilter.map((bodyItem:any)=> (bodyItem.list[4].toLowerCase() === selectedSchoolType)
            ?   filteredData.push(bodyItem)
            :   null
        );

        setFilteredData([...filteredData]);
    }

    const filterByLocation = (selectedLocation:any)=> {
        const dataToFilter =    (filteredData.length > 0)
                                ? filteredData
                                : tableData.body

        console.log(dataToFilter);

        filteredData.splice(0, filteredData.length);
        setFilteredData([...filteredData]);

        dataToFilter.map((bodyItem:any)=> (bodyItem.list[3].toLowerCase() === selectedLocation)
            ?   filteredData.push(bodyItem)
            :   null
        );

        setFilteredData([...filteredData]);
    }

    const filterByLGA = (selectedLGA:any)=> {
        const dataToFilter =    (filteredData.length > 0)
                                ? filteredData
                                : tableData.body

        filteredData.splice(0, filteredData.length);
        setFilteredData([...filteredData]);

        dataToFilter.map((bodyItem:any)=> (bodyItem.list[2].toLowerCase() === selectedLGA.toLowerCase())
            ?   filteredData.push(bodyItem)
            :   null
        );

        setFilteredData([...filteredData]);
    }


    const schoolsCollectionRef = collection(db, 'schools');

    useEffect(()=> {
        
        const getSchools = async ()=> {
            const response = await getDocs(schoolsCollectionRef)
            const allSchools:any = [];

            response.docs.map((doc)=> {
                return (()=> {
                    const item = doc.data();
                    allSchools.unshift({
                        id: doc.id, 
                        list: [item.name, item.nemisCode, item.lga, item.town, item.type, item.category]
                    })
                })
            });
        
            tableData.body = allSchools;
            setTableData({...tableData});
        }

        getSchools();

    }, [schoolsCollectionRef, tableData]);

    return (
        <div className={styles.container}>
            <div className={styles.search_field}>
                <div className={styles.search_icon}><FaSearch /></div>
                <input 
                    className={styles.search_input}
                    placeholder="Search by school name"
                    onKeyUp={(e:any)=> filterBySearchKeyword(e.target.value)}
                />
                <div className={styles.category}>
                    <DropDown
                        childRef={categoryRef}
                        position={1}
                        options={categories.options}
                        selectedOptionIndex={categories.selectedOptionIndex}
                        isSelected={categories.isSelected}
                        isOptionsVisibile={dropDownList[1]}
                        openMenu={()=> toggleOptionsVisibility(1)}
                        select={(index:any)=> selectOption(index, categories, 'categories')}
                    />
                </div>
            </div>
            <div className={styles.filter_options}>
                <div className={styles.school_type}>
                    <div className={styles.label}>School Type</div>
                    <div className={styles.options}>
                        {
                            schoolTypes.map((schoolType:any, count:any)=>{
                                return <CheckBox 
                                            key={count} 
                                            index={count}
                                            label={schoolType.label} 
                                            isSelected={schoolType.selected} 
                                            select={(index:any)=> selectOption(index, schoolTypes, 'school-types')}
                                        />
                            })
                        }
                    </div>
                </div>
                
                <div className={styles.location}>
                    <div className={styles.label}>Location</div>
                    <div className={styles.options}>
                        {
                            locations.map((schoolType:any, count:any)=>{
                                return <CheckBox 
                                            key={count} 
                                            index={count}
                                            label={schoolType.label} 
                                            isSelected={schoolType.selected} 
                                            select={(index:any)=> selectOption(index, locations, 'locations')}
                                        />
                            })
                        }
                    </div>
                </div>

                <div className={styles.lga_filter}>
                    <div className={styles.label}>LGA</div>
                    <div className={styles.dropdown_wrapper} ref={lgaRef}>
                        <DropDown
                            position={0}
                            options={lga.options}
                            selectedOptionIndex={lga.selectedOptionIndex}
                            isSelected={lga.isSelected}
                            isOptionsVisibile={dropDownList[0]}
                            openMenu={()=> toggleOptionsVisibility(0)}
                            select={(index:any)=> selectOption(index, lga, 'lga')}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.table_wrapper}>
                <DataTable 
                    headings={tableData.heading} 
                    body={(filteredData.length === 0 && schoolTypes[0].selected && locations[0].selected && !categories.isSelected && !lga.isSelected  ) ?tableData.body :filteredData}
                />
            </div>
        </div>
    );
}
