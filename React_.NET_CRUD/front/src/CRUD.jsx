import React, {useState, useEffect, Fragment} from 'react';
import Table from 'react-bootstrap/Table';

function CRUD() {
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
        setData(empData);
    })
  return (
    <Fragment>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>IsActive</th>
                </tr>
            </thead>
            <tbody>
                {data && data.length > 0 ? data.map((item, index) =>{
                    return(
                        <tr>
                            <td>item.id</td>
                            <td>item.name</td>
                            <td>item.age</td>
                            <td>item.isActive</td>
                        </tr>
                    )
                }) : ("Loading...")}
                
            </tbody>
        </Table>
    </Fragment>
  )
}

export default CRUD