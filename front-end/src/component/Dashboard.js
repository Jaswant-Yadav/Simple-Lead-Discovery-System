import React from "react";

const Dashboard = () => {
   

    return (
        <div className="dashboard">   
            <h1>Dashboard</h1>

            <p>Welcome to dashboard</p>

            <a href="/companieslist">Company List</a>

            <a href="/addcompanies">Add New Company</a>
            <br /><br />

            <a href="/enrich">Enrich Company</a>

            <a href="/addContact">Add Contact</a>
           
        </div>
    );
};

export default Dashboard;
