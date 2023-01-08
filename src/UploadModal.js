import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

const UploadModal = (props) => {

    const handleClose = () => props.setShow(false);
    const [files,setFiles] = React.useState([]);
    const handleFileRead = async (event) => {
        console.log(event.target.files)
        setFiles(Array.from(event.target.files).map((item)=>item.name))
    }

    const handleUpload = (e) => {
        const data = files.map((item)=> {return {bucket_name:props.selectedBName,file_path:"./"+item}})
        axios.post("http://localhost:5000/upload_files",data,{
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
                console.log(data)
            });

    }

    return (
        <>

            <Modal show={props.show} onHide={handleClose} {...props}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Files</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Select Bucket</Form.Label>
                            <Form.Select aria-label="Default select example" >
                                <option>Select a bucket</option>
                                {props.buckets.map((item,index)=>(<option value={item.name} key={item.name}>{item.name}</option>))}

                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Files</Form.Label>
                            <Form.Control id="originalFileName"
                                          type="file"
                                          inputProps={{ accept: 'image/*' }}
                                          required
                                          label="Document"
                                          name="originalFileName"
                                          onChange={e => handleFileRead(e)}
                                          style={{height: 'auto'}}
                                          size="small"
                                          variant="standard"
                                          multiple

                            />

                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpload}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UploadModal;