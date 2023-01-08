import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

const DeleteBucketModal = (props) => {

    const handleClose = () => props.setShow(false);
    const handleDelete = (e) => {
        const data={bucket_name:props.name}
        axios.post("http://localhost:5000/delete_bucket",data,{
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
                console.log()
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
                    {props.name?
                        <p>Are you sure you want to delete bucket {props.name}</p>:
                        <p style={{color:"red"}}>No bucket selected. Please select a bucket!</p>
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

export default DeleteBucketModal;