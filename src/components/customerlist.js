import React, { useEffect, useState, useRef } from "react";
import '../App.css';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    // Call rest api
    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(responseData => {
            setCustomers(responseData.content)
        })
        .catch(err => console.error(err))
    }, []);

    const deleteCustomer = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setCustomers(customers.filter((customer, index) =>
                index !== gridRef.current.getSelectedNodes()[0].childIndex))
        }
        else {
            alert('Select row first');
        }
    };

    function fullNameGetter(params) {
        return params.data.lastname + ' ' + params.data.firstname;
    }


    const columns = [
        {headerName: 'Name', field: 'lastname&firstname', sortable: true, filter: true, width: 130, valueGetter: fullNameGetter},
//      {headerName: 'Last Name', field: 'lastname', sortable: true, filter: true, width: 130},
        {headerName: 'Address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, width: 120},
        {headerName: 'City', field: 'city', sortable: true, filter: true, width: 120},
        {headerName: 'Email', field: 'email', sortable: true, filter: true},
        {headerName: 'Phone Number', field: 'phone', sortable: true, filter: true, width: 160}
    ]

    return (
        <div
        className="ag-theme-material"
        style={{
            height: '800px',
            width: '70%',
            margin: 'auto',
            align: 'center'
        }}>
            <h1>Customers</h1>
            <button onClick={deleteCustomer}>Delete</button>
            <AgGridReact
            ref={gridRef}
            onGridReady= {params => gridRef.current = params.api}
            rowSelection="single"
            columnDefs={columns}
            rowData={customers}>
            </AgGridReact>
        </div>
    );
};