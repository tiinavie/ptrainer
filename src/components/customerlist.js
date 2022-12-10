import React, { useEffect, useState, useRef } from "react";
import '../App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Snackbar from '@mui/material/Snackbar';

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState([]);
    const gridRef = useRef();

    const [open, setOpen] = useState(false);

    // Call rest api
    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(responseData => {
            setCustomers(responseData.content)
        })
        .catch(err => console.error(err))
    }, []);

    //delete a customer
    const deleteCustomer = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            (window.confirm('Are you sure you want to delete this customer?'))
            setCustomers(customers.filter((customer, index) =>
                index !== gridRef.current.getSelectedNodes()[0].childIndex))
                setOpen(true);
            }
        else {
            alert('Select row first');
        }
    };

    // add a customer
    const addCustomer = (e) => {
        e.preventDefault();
        setCustomers([customer, ...customers]);
    }

    const inputChanged = (e) => {
        setCustomer({...customer, [e.target.name]: e.target.value});
    }

    // combines firstname and lastname into one field
    function fullNameGetter(params) {
        return params.data.lastname + ', ' + params.data.firstname;
    }

    const columns = [
        {headerName: 'Name', field: 'lastname&firstname', sortable: true, filter: true, resizable: true, valueGetter: fullNameGetter},
        {headerName: 'Address', field: 'streetaddress', sortable: true, filter: true, resizable: true},
        {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, resizable: true, width: 150},
        {headerName: 'City', field: 'city', sortable: true, filter: true, resizable: true, width: 150},
        {headerName: 'Email', field: 'email', sortable: true, filter: true, resizable: true},
        {headerName: 'Phone Number', field: 'phone', sortable: true, filter: true, resizable: true}
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

            <Stack
            spacing={2} 
            direction="row"
            justifyContent="center"
            alignItems="center">
                <TextField
                    label="First Name" 
                    variant="standard"
                    name="firstname"
                    value={customer.firstname} 
                    onChange={inputChanged}>
                </TextField>
                <TextField
                    label="Last Name" 
                    variant="standard"
                    name="lastname"
                    value={customer.lastname} 
                    onChange={inputChanged}>
                </TextField>
                <TextField
                    label="Street Address" 
                    variant="standard"
                    name="streetaddress"
                    value={customer.streetaddress} 
                    onChange={inputChanged}>
                </TextField>
                <TextField
                    label="Postcode"
                    variant="standard"
                    name="postcode"
                    value={customer.postcode} 
                    onChange={inputChanged}>
                </TextField>
                <TextField
                    label="City" 
                    variant="standard"
                    name="city"
                    value={customer.city} 
                    onChange={inputChanged}>
                </TextField>
                <TextField
                    label="Email" 
                    variant="standard"
                    name="email"
                    value={customer.email} 
                    onChange={inputChanged}>
                </TextField>
                <TextField
                    label="Phone Number" 
                    variant="standard"
                    name="phone"
                    value={customer.phone} 
                    onChange={inputChanged}>
                </TextField>

                <Button variant="contained" onClick={addCustomer} size="small">Add</Button>
                <Button variant="contained" color="error" onClick={deleteCustomer} size="small">Delete</Button>
        </Stack>

            <AgGridReact
            ref={gridRef}
            onGridReady= {params => gridRef.current = params.api}
            rowSelection="single"
            columnDefs={columns}
            rowData={customers}
            animateRows={true}>
            </AgGridReact>

            <Snackbar
                    open={open}
                    message="Entry deleted"
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                />

        </div>
    );
};