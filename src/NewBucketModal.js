import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

const NewBucketModal = (props) => {

    const handleClose = () => props.setShow(false);
    const [bucketName, setBucketName] = useState("");
    const [bucketRegion,setBucketRegion] = useState("");
    const allowedRegions = ["us-east-1","us-east-2","us-west-1","us-west-2","ap-south-1","ap-northeast-3","ap-northeast-2","ap-southeast-1","ap-southeast-2","ap-northeast-1","ca-central-1","eu-central-1","eu-west-1","eu-west-2","eu-west-3","eu-north-1","sa-east-1"]
    const handleCreate = (e) => {
        axios.post("http://localhost:5000/create_bucket",{bucket_name:bucketName,region:bucketRegion},{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json" ,
            },
        })
            .then((response) => {
                //setBuckets(response.data)
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
                    <Modal.Title>Create New Bucket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Bucket Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="unique name"
                                value={bucketName}
                                onChange={(e)=>{setBucketName(e.target.value)}}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Bucket Region</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e)=>{setBucketRegion(e.target.value)}}>
                                <option>Select a region</option>
                                {allowedRegions.map((item,index)=>(<option value={item} key="{index}">{item}</option>))}

                            </Form.Select>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewBucketModal;