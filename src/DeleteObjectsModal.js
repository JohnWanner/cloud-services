import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

const DeleteObjectsModal = (props) => {

    const handleClose = () => props.setShow(false);
    const handleDelete = (e) => {
        axios.post("http://localhost:5000/delete_files",{bucket_name:props.selectedBName,Objects:props.selectedONames.map((item)=>{return {Key:item}})},{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json" ,
            },
        })
            .then((response) => {
                alert(response.data)
            })
            .catch(error => {
                alert(error)
            });
    }

    return (
        <>

            <Modal show={props.show} onHide={handleClose} {...props}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Bucket: {props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.selectedONames.length!=0?
                        <div>
                            <p>Are you sure you want to delete selected files {props.name}</p>
                            <ul> {props.selectedONames.map((item)=><li>{item}</li>)} </ul>
                        </div>
                        :
                        <p style={{color:"red"}}>No file selected. Please select at least one file!</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteObjectsModal;