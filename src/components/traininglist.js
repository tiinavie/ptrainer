import React, { useEffect, useState, useRef } from "react";
import '../App.css';
import { AgGridReact } from 'ag-grid-react';
import format from "date-fns/format";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function TrainingList() {
        const [trainings, setTrainings] = useState([]);
        const gridRef = useRef();

    // Call rest api
    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData => {
            setTrainings(responseData.content)
        })
    }, []);

    // delete training
    const deleteTraining = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTrainings(trainings.filter((training, index) =>
                index !== gridRef.current.getSelectedNodes()[0].childIndex))
        }
        else {
            alert('Select row first');
        }
    };

    const columns = [
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true, width: 150},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true, width: 120},
        {headerName: 'Date', field: 'date', sortable: true, filter: true, width: 200,
            valueFormatter: params => format(new Date(params.value), "dd.MM.yyyy 'klo' HH:mm")},
        {headerName: 'Customer', field: '', sortable: true, filter: true, width: 150}
        ];


    return (
        <div
        className="ag-theme-material"
        style={{
            height: '800px',
            width: '40%',
            margin: 'auto'
        }}>
            <h1>Training</h1>
            <button onClick={deleteTraining}>Delete</button>
            <AgGridReact
            ref={gridRef}
            onGridReady= {params => gridRef.current = params.api}
            rowSelection="single"
            columnDefs={columns}
            rowData={trainings}>
            </AgGridReact>
        </div>
    );
};

export default TrainingList;