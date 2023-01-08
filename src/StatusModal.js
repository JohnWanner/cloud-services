import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

const StatusModal = (props) => {

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
                    {console.log(props.status)}
                    {props.status?
                    <h3>{props.status[0]}: {props.status[1]}</h3>:
                        null}
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

export default StatusModal;