import React, { useEffect, useState, useRef } from "react";
import '../App.css';
import { AgGridReact } from 'ag-grid-react';
import format from "date-fns/format";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Snackbar from '@mui/material/Snackbar';

import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function TrainingList() {
        const [trainings, setTrainings] = useState([]);
        const [training, setTraining] = useState([]);

        const [time, setTime] = useState(dayjs('2019-01-01T00:00:00.000+0000'));
        const gridRef = useRef();

        const [open, setOpen] = useState(false);


    // Call rest api
    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData => {
            setTrainings(responseData.content)
        })
    }, []);

    // add a training
    const addTraining = (e) => {
        e.preventDefault();
        setTrainings([training, ...trainings]);
    }

    const inputChanged = (e) => {
        setTraining({...training, [e.target.name]: e.target.value});
    }

    // delete training
    const deleteTraining = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTrainings(trainings.filter((training, index) =>
                index !== gridRef.current.getSelectedNodes()[0].childIndex))
                setOpen(true);
        }
        else {
            alert('Select row first');
        }
    };

    const columns = [
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
        {headerName: 'Date', field: 'date', sortable: true, filter: true,
            valueFormatter: params => format(new Date(params.value), "dd.MM.yyyy 'klo' HH:mm")},
        {headerName: 'Customer', field: '', sortable: true, filter: true}
        ];


    return (
        <div
        className="ag-theme-material"
        style={{
            height: '800px',
            width: '60%',
            margin: 'auto'
        }}>
            <h1>Training</h1>
s
            <Stack
            spacing={2} 
            direction="row"
            justifyContent="center"
            alignItems="center">
                <TextField
                    label="Activity" 
                    variant="standard"
                    name="activity"
                    value={training.activity} 
                    onChange={inputChanged}>
                </TextField>
                <TextField
                    label="Duration" 
                    variant="standard"
                    name="duration"
                    value={training.duration} 
                    onChange={inputChanged}>
                </TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                    label="Date & Time"
                    renderInput={(params) =>
                        <TextField {...params}
                        sx={{width: 650}}/>
                    }
                    time={time}
                    onChange={(newTime) => {
                        setTime(newTime);
                    }} />
                </LocalizationProvider>
                <TextField
                    label="Customer"
                    variant="standard"
                    name="customer" 
                    value={trainings.customers}
                    sx={{width: 250}}
                    >
                </TextField>


                <Button variant="contained" onClick={addTraining} size="small">Add</Button>
                <Button variant="contained" color="error" onClick={deleteTraining} size="small">Delete</Button>
        </Stack>

            <AgGridReact
            ref={gridRef}
            onGridReady= {params => gridRef.current = params.api}
            rowSelection="single"
            columnDefs={columns}
            rowData={trainings}>
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