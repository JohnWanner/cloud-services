import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import {CSSProperties } from "react";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    PaginationTotalStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import {Buckets,Objects,Buckets2} from './dummyData'
import NewBucketModal from './NewBucketModal'
import FilterByRegionModal from "./FilterByRegionModal";
import DeleteBucketModal from "./DeleteBucketModal";
import UploadModal from "./UploadModal";
import axios from "axios";
import DeleteObjectsModal from "./DeleteObjectsModal";
import ClipLoader from "react-spinners/ClipLoader";
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import logo from './load.gif'



const S3 = (props) => {

    //Modals
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);

    //Toasts
    const [show, setShow] = useState(true);

    //Loader

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    //Button click handlers
    const handleNewBucket = (e) => {
        console.log("handleNewBucket")
        setShow1(true)

    }
    const handleDeleteBucket = () => {
        console.log("handleDeleteBucket")
        setShow3(true)
    }
    const handleFilterByRegion = () => {
        console.log("handleFilterByRegion")
        setShow2(true)
    }

    const handleUploadObjects = (e) => {
        console.log("handleNewBucket")
        setShow4(true)

    }
    const handleDownloadObjects = () => {
        const data = selectedONames.map((item)=>{return {bucket_name:selectedBName,file_path:"./"+item}})
        console.log("handleDeleteBucket")
        axios.post("http://localhost:5000/download_files",data,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json" ,
            },
        })
            .then((response) => {
                alert(response.data + "\n" + "data sent: "+"\n" + data)
                console.log(data)
            })
            .catch(error => {
                alert(error + "\n" + "data sent: "+"\n" + data)
                console.log(data)
            });
    }
    const handleDeleteObjects = () => {
        console.log("handleFilterByRegion")
        setShow5(true)
    }

    //TABLE 1 CONFIGURATIONS
    const [buckets, setBuckets] = useState([]);
    const columns1 = [
        { dataField: 'name', text: 'Name' },
        { dataField: 'region', text: 'Region' },
    ]
    const [selectedBName,setSelectedBName] = useState("");
    const rowStyle1 = (row, rowIndex) => {
        const style = {};
        if (row.name==selectedBName) {
            style.backgroundColor = '#c8e6c9';
            style.fontWeight = 'bold';
        }

        return style;
    };
    const [selectedRegions,setSelectedRegions] = useState([... new Set(buckets.map(item => item.region))]);
    const paginationOption1 = {
        custom: true,
        totalSize: buckets.filter((item)=>selectedRegions.includes(item.region)).length
    };
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            //console.log(`clicked on row with index: ${rowIndex}`);
            //setSelectedBName(row.name)
        },
        onMouseEnter: (e, row, rowIndex) => {
            //console.log(`enter on row with index: ${rowIndex}`);
        }
    };
    const selectRow1 = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row) =>{
            setSelectedBName(row.name)
        },
    };


    //TABLE 2 CONFIGURATIONS
    const columns2 = [
        { dataField: 'name', text: 'Name' },
        { dataField: 'size', text: 'Size' },
    ]
    //const [objects,setObjects] = useState(Objects);
    const [objects,setObjects] = useState([]);
    const [selectedONames,setSelectedONames] = useState([]);
    const paginationOption2 = {
        custom: true,
        totalSize: objects.length
    };
    const selectRow2 = {
        mode: 'checkbox',
        clickToSelect: false,
        onSelect: (row,isSelected) =>{
                console.log("select clicked")
                if(!isSelected){
                    setSelectedONames((current) =>
                        current.filter((item) => item.name !== row.name)
                    );
                }
                else {
                    setSelectedONames(current => [...current, row.name]);
                }

            }
    };

    //HOOKS
    React.useEffect(() => {
        axios.get("http://localhost:5000/get_buckets",{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json" ,
            },
        })
            .then((response) => {
            setBuckets(response.data)
        })
            .catch(error => {
                console.log(error)
            });
    }, []);

    React.useEffect(() => {
       setSelectedRegions([... new Set(buckets.map(item => item.region))])
        if(buckets.length !=0) {
            setSelectedBName(buckets[0].name)
        }
    }, [buckets]);

    React.useEffect(() => {

        axios.post("http://localhost:5000/view_files",{bucket_name:selectedBName},{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json" ,
            },
        })
            .then((response) => {
                setObjects(response.data)
            })
            .catch(error => {
                console.log(error)
            });


    }, [selectedBName]);





    return (
        <>

                <ToastContainer className="p-3" position={'top-end'}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Header closeButton={false}>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                    </Toast>
                </ToastContainer>


            <Container>
                <Row>
                    <Col>

                        <h2>Buckets</h2>
                        <Dropdown style={{textAlign:"right",margin:"10px"}}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Actions
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleNewBucket}>Create New Bucket</Dropdown.Item>
                                <Dropdown.Item onClick={handleDeleteBucket}>Delete Selected Bucket</Dropdown.Item>
                                <Dropdown.Item onClick={handleFilterByRegion}>Filter by Region</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        {buckets.length == 0 ?
                                <img src={logo} alt="loading..." style={{height: "100px"}}/>
                            :

                            <PaginationProvider
                                pagination={paginationFactory(paginationOption1)}
                            >
                                {
                                    ({
                                         paginationProps,
                                         paginationTableProps
                                     }) => (
                                        <div>

                                            <BootstrapTable
                                                keyField="name"
                                                data={buckets.filter((item) => selectedRegions.includes(item.region))}
                                                columns={columns1}
                                                rowStyle={rowStyle1}
                                                rowEvents={rowEvents}
                                                selectRow={selectRow1}
                                                {...paginationTableProps}
                                            />
                                            <SizePerPageDropdownStandalone
                                                {...paginationProps}
                                            />
                                            <PaginationTotalStandalone
                                                {...paginationProps}
                                            />
                                            <PaginationListStandalone
                                                {...paginationProps}
                                            />
                                        </div>
                                    )
                                }
                            </PaginationProvider>
                        }
                    </Col>
                    <Col>
                        <h2>Objects</h2>

                        <Dropdown style={{textAlign:"right",margin:"10px"}}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Actions
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleUploadObjects}>Upload Objects</Dropdown.Item>
                                <Dropdown.Item onClick={handleDownloadObjects}>Download Selected Objects</Dropdown.Item>
                                <Dropdown.Item onClick={handleDeleteObjects}>Delete Selected Objects</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        {objects.length==0?
                           null
                            :

                        <PaginationProvider
                            pagination={ paginationFactory(paginationOption2) }
                        >
                            {
                                ({
                                     paginationProps,
                                     paginationTableProps
                                 }) => (
                                    <div>

                                        <BootstrapTable
                                            keyField="name"
                                            data={ objects }
                                            columns={ columns2 }
                                            selectRow={ selectRow2 }
                                            { ...paginationTableProps }
                                        />
                                        <SizePerPageDropdownStandalone
                                            { ...paginationProps }
                                        />
                                        <PaginationTotalStandalone
                                            { ...paginationProps }
                                        />
                                        <PaginationListStandalone
                                            { ...paginationProps }
                                        />
                                    </div>
                                )
                            }
                        </PaginationProvider>
                        }
                    </Col>
                </Row>
            </Container>
            <NewBucketModal show={show1} setShow={setShow1}></NewBucketModal>
            <FilterByRegionModal show={show2} setShow={setShow2} buckets={buckets} selectedRegions={selectedRegions} setSelectedRegions={setSelectedRegions}></FilterByRegionModal>
            <DeleteBucketModal show={show3} setShow={setShow3} name={selectedBName}></DeleteBucketModal>
            <UploadModal show={show4} setShow={setShow4} buckets={buckets} selectedBName={selectedBName}> </UploadModal>
            <DeleteObjectsModal show={show5} setShow={setShow5} selectedONames={selectedONames} selectedBName={selectedBName}> </DeleteObjectsModal>
            <Alert key={"primary"} variant={"primary"}>
                This is a {"primary"} alert with{' '}
                <Alert.Link href="#">an example link</Alert.Link>. Give it a click if
                you like.
            </Alert>



        </>
    );
}

export default S3;