import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const NewBucketModal = (props) => {

    const handleClose = () => props.setShow(false);

    return (
        <>

            <Modal show={props.show} onHide={handleClose} {...props}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Filter By Region</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Select Regions</Form.Label>
                            {[...new Set(props.buckets.map(item => item.region))].map((item) =>
                                (<Form.Check
                                    type={'checkbox'}
                                    id={item}
                                    label={item}
                                    checked={props.selectedRegions.includes(item)}
                                    onChange={(e)=>{
                                        if(e.target.checked){
                                            props.setSelectedRegions((current) => {
                                                    console.log(current)
                                                return [...new Set([...current,item])]
                                                }
                                            );
                                        }
                                        else {
                                            props.setSelectedRegions((current) =>
                                                current.filter((region) => region !== item)
                                            );

                                        }
                                        }}
                                />)
                            )}

                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewBucketModal;