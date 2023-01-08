import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Charts from "./Charts";
import Tab from "react-bootstrap/Tab";
import S3 from "./S3";
import Compute from "./Compute";
import Tabs from "react-bootstrap/Tabs";

const MonitorModal = (props) => {

    const handleClose = () => props.setShow(false);

    return (
        <>

            <Modal show={props.show} onHide={handleClose} {...props}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Instance {props.selectedInstance}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="first" style={{margin:"30px"}}>
                        <Tab eventKey="first" title="CPU Utilisation">
                            <Charts data={props.cpu} title="CPU Utilisation(%)"></Charts>
                        </Tab>
                        <Tab eventKey="second" title="Network Packets In">
                            <Charts data={props.networkIn} title="Network Packets In(Count)"></Charts>
                        </Tab>
                        <Tab eventKey="third" title="Network Packets Out">
                            <Charts data={props.networkOut} title="Network Packets Out(Count)"></Charts>
                        </Tab>
                        <Tab eventKey="fourth" title="Network In">
                            <Charts data={props.nIn} title="Network In(Bytes)"></Charts>
                        </Tab>
                        <Tab eventKey="fifth" title="Network Out">
                            <Charts data={props.nOut} title="Network Out(Bytes)"></Charts>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MonitorModal;