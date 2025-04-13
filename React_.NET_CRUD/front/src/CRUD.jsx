import React, {useState, useEffect, Fragment} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CRUD() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [isActive, setIsActive] = useState(0);

    const [editId, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editAge, setEditAge] = useState('');
    const [editIsActive, setEditIsActive] = useState(0);

    const empData =[
        {
            id: 1,
            name: 'John',
            age: '26',
            isActive: 1
        },
        {
            id: 2,
            name: 'mary',
            age: '23',
            isActive: 0
        },
        {
            id: 3,
            name: 'Jane',
            age: '24',
            isActive: 1
        }
    ];

    const [data, setData] = useState([]);

    useEffect(() =>{
        getData();
    }, []);

    const getData = () =>{
        axios.get('https://localhost:44392/api/Employee')
        .then((result)=>{
            setData(result.data);
            console.log(result)
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    const addEmployee = () =>{
        const data ={
            "name": name,
            "age": age,
            "isActive": isActive
        }

        axios.post('https://localhost:44392/api/Employee', data)
        .then((result)=>{
            console.log(result)
            getData();
            clear();
            toast.success("Employee has been added");
        })
        .catch((error) =>{
            toast.error(error);
            console.log(error);
        })
    }

    const updateEmployee = () =>{
        const data ={
            "id": editId,
            "name": editName,
            "age": editAge,
            "isActive": editIsActive
        }
        

        axios.put(`https://localhost:44392/api/Employee/${editId}`, data)
        .then((result)=>{
            console.log(result);
            getData();
            clear();
            toast.success("Employee has been updated");
            handleClose();
        })
        .catch((error) =>{
            toast.error(error);
            console.log(error);
        })
    }

    const clear = () =>{
        setName('');
        setAge('');
        setIsActive(0);
        setEditName('');
        setEditAge('');
        setEditIsActive(0);
        setEditId('');
    }

    const handleActiveChange = (e) =>{
        if(e.target.checked){
            setIsActive(1);
        }
        else{
            setIsActive(0);
        }
    }

    const handleActiveChangeEdit = (e) =>{
        if(e.target.checked){
            setEditIsActive(1);
        }
        else{
            setEditIsActive(0);
        }
    }

    const handleEdit = (item) =>{
        setEditId(item.id);
        setEditName(item.name);
        setEditAge(item.age);
        setEditIsActive(item.isActive);
        handleShow();
    }

    const handleDelete = (id) =>{
        if(window.confirm("Are Your sure to delete this employee") == true){
            axios.delete(`https://localhost:44392/api/Employee/${id}`)
            .then((result)=>{
                console.log(result)
                getData();
                if(result.status === 200){
                    toast.success("Employee has been deleted");
                }
            })
            .catch((error) =>{
                toast.error(error);
                console.log(error);
            })
        }
    }

    const handleUpdate =() =>{
        console.log('ok')
    }


  return (
    <Fragment>
        <ToastContainer />
        <Container>
            <Row>
                <Col><input type="text" className='form-control' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}/></Col>
                <Col><input type="text" className='form-control' placeholder='Enter Age' value={age} onChange={(e) => setAge(e.target.value)}/></Col>
                <Col><input type="checkbox" checked={isActive === 1 ? true : false} onChange={(e) => handleActiveChange(e)} value={isActive}/><label>Is Active</label></Col>
                <Col><button className='btn btn-primary' onClick={() => addEmployee()}>Submit</button></Col>
            </Row>
        </Container>
        <br></br>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Age</th>
                <th>IsActive</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data && data.length > 0 ? data.map((item, index) =>{
                    return(
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.isActive}</td>
                            <td colSpan={2}>
                                <button className='btn btn-primary' onClick={() => handleEdit(item)}>Edit</button> &nbsp;
                                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }) : (
                    <tr>
                        <td colSpan="4" style={{ textAlign: 'center' }}>
                        Loading...
                        </td>
                    </tr>
                )}
                
            </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modify Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col><input type="text" className='form-control' placeholder='Enter Name' value={editName} onChange={(e) => setEditName(e.target.value)}/></Col>
                    <Col><input type="text" className='form-control' placeholder='Enter Age' value={editAge} onChange={(e) => setEditAge(e.target.value)}/></Col>
                    <Col><input type="checkbox" checked={editIsActive === 1 ? true : false} onChange={(e) => handleActiveChangeEdit(e)} value={editIsActive}/><label>Is Active</label></Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() => updateEmployee()}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </Fragment>
  )
}

export default CRUD