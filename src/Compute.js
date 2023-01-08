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
import Button from 'react-bootstrap/Button';

import axios from "axios";
import StatusModal from "./StatusModal";

import Alert from 'react-bootstrap/Alert';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import logo from './load.gif'
import NewBucketModal from "./NewBucketModal";
import MonitorModal from "./MonitorModal";



const Compute = (props) => {

    //Modals
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const [selectedInstance, setSelectedInstance] = useState();
    const [status, setStatus] = useState();

    const [networkIn, setNetworkIn] = useState();
    const [networkOut, setNetworkOut] = useState();
    const [cpu, setCpu] = useState();
    const [nIn, setNIn] = useState();
    const [nOut, setNOut] = useState();





    //Loader

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    //functions
    const getStatus = (e) => {
        console.log("getStatus called")
    }
    const startInstances = () => {
        console.log("Start instances called")
    }
    const stopInstances = () => {
        console.log("Stop instances called")
    }

    const handleStartInstances = () => {
        const data = selectedIIds
        axios.post("http://localhost:5000/start_instances",data,{
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
    const handleStopInstances = () => {
        const data = selectedIIds
        axios.post("http://localhost:5000/stop_instances",data,{
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
    const handleShow = (e,id) => {
        axios.get("http://localhost:5000/get_status",{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json" ,
            },
        })
            .then((response) => {
                for (const i of response.data){
                   if(i.ID ==id){
                       console.log(i)
                       setStatus([i['Status']['Details'][0].Name,i['Status']['Details'][0].Status])
                       setSelectedInstance(id)
                       setShow1(true)
                       break;
                   }
                }
            })
            .catch(error => {
                console.log(error)
            });
    }
    const handleMonitor = (e,id) => {
        console.log(id)
        axios.post("http://localhost:5000/get_metric_data",id,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json" ,
            },
        })
            .then((response) => {
                for (const i of response.data){
                    console.log(i)
                    if(i.Label =="CPUUtilization"){
                        setCpu(i.Datapoints.map((item)=>{return {x:Date.parse(item.Timestamp.split(', ')[1]),y:item.Average}}).sort((a,b) => a.x - b.x))
                        console.log(i.Datapoints.map((item)=>{return {x:Date.parse(item.Timestamp.split(', ')[1]),y:item.Average}}))
                    }
                    else if(i.Label =="NetworkPacketsIn"){
                        setNetworkIn(i.Datapoints.map((item)=>{return {x:Date.parse(item.Timestamp.split(', ')[1]),y:item.Average}}).sort((a,b) => a.x - b.x))
                    }
                    else if(i.Label == "NetworkPacketsOut"){
                        setNetworkOut(i.Datapoints.map((item)=>{return {x:Date.parse(item.Timestamp.split(', ')[1]),y:item.Average}}).sort((a,b) => a.x - b.x))
                    }
                    else if(i.Label == "NetworkIn"){
                        setNIn(i.Datapoints.map((item)=>{return {x:Date.parse(item.Timestamp.split(', ')[1]),y:item.Average}}).sort((a,b) => a.x - b.x))

                    }
                    else if(i.Label == "NetworkOut"){
                        setNOut(i.Datapoints.map((item)=>{return {x:Date.parse(item.Timestamp.split(', ')[1]),y:item.Average}}).sort((a,b) => a.x - b.x))

                    }

                }
                setSelectedInstance(id)
                setShow2(true)
                //console.log(cpu)
                //console.log(networkIn)
                //console.log(networkOut)
            })
            .catch(error => {
                console.log(error)
            });


    }


    const [instances, setInstances] = useState([]);
    //TABLE 2 CONFIGURATIONS
    const columns = [
        { dataField: 'ID', text: 'ID' },
        { dataField: 'Key', text: 'Key' },
        { dataField: 'Launch_Time', text: 'Launch_Time' },
        { dataField: 'Name', text: 'Name' },
        { dataField: 'Public_DNS', text: 'Public_DNS' },
        { dataField: 'Security_Group', text: 'Security_Group' },
        { dataField: 'State', text: 'State' },
        { dataField: 'Type', text: 'Type' },
        { dataField: 'region', text: 'region'},
        {dataField: 'status', text: 'status',formatter: (cell, row) => {return (row.State=="running"?<Button id={`${row.ID}`} variant="primary" onClick={(e) => {handleShow(e,row.ID)}}>
                Show
            </Button>:null)}},
        {dataField: 'monitor', text: 'monitor',formatter: (cell, row) => {return (row.State=="running"?<Button id={`${row.ID}`} variant="primary" onClick={(e) => {handleMonitor(e,row.ID)}}>
                Monitor
            </Button>:null)}}
    ]
    const [selectedIIds,setSelectedIIds] = useState([]);
    const paginationOption = {
        custom: true,
        totalSize: instances.length
    };
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: false,
        onSelect: (row,isSelected) =>{
            console.log("select clicked")
            if(!isSelected){
                setSelectedIIds((current) =>
                    current.filter((item) => item.ID !== row.ID)
                );
            }
            else {
                setSelectedIIds(current => [...current, row.ID]);
            }

        }
    };

    //HOOKS
    React.useEffect(() => {
        axios.get("http://localhost:5000/get_instances",{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json" ,
            },
        })
            .then((response) => {
                setInstances(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    }, []);


    return (
        <>


            <Container>

                        <h2>Instances</h2>
                        <Dropdown style={{textAlign:"right",margin:"10px"}}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Actions
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleStartInstances}>Start Instances</Dropdown.Item>
                                <Dropdown.Item onClick={handleStopInstances}>Stop Instances</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        {instances.length==0?
                                <img src={logo} alt="loading..." style={{height: "100px"}}/>
                            :

                            <PaginationProvider
                                pagination={ paginationFactory(paginationOption) }
                            >
                                {
                                    ({
                                         paginationProps,
                                         paginationTableProps
                                     }) => (
                                        <div>

                                            <BootstrapTable
                                                keyField="ID"
                                                data={ instances }
                                                columns={ columns }
                                                selectRow={ selectRow }
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

            </Container>
            <StatusModal show={show1} setShow={setShow1} selectedInstance={selectedInstance} status={status}></StatusModal>
            <MonitorModal show={show2} setShow={setShow2} selectedInstance={selectedInstance} cpu={cpu} networkIn={networkIn} networkOut={networkOut} nIn={nIn} nOut={nOut}></MonitorModal>






        </>
    );
}

export default Compute;