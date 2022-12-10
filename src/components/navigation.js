import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CustomerList from "./customerlist";
import TrainingList from "./traininglist";

export default function Navigation(props) {
    return (
        <BrowserRouter>
        {/* <Link to="../">Home</Link>{' | '} */}
        <Link to="/customers">Customers</Link>{' | '}
        <Link to="/training">Training</Link>
            <Routes>
                {/* <Route exact path="/" element={<Home />} /> */}
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/training" element={<TrainingList />} />
            </Routes>
        </BrowserRouter>
        )
};

