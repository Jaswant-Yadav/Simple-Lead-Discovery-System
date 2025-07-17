import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Companies = () => {
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [funding_stage, setFunding] = useState("");
    const navigate = useNavigate();

    const formSubmit = async (e) => {
        e.preventDefault();

        let result = await fetch("http://localhost:5000/api/companies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, website, funding_stage })
        });

        result = await result.json(); // Parse the response as JSON
        console.log(result); // Check if the company was added correctly

        // If the result is okay, navigate to the dashboard
        if (result.message) {
            navigate('/companieslist');
        }
    };


    return (
        <div>
            <h2>Add New Company</h2>
            <form onSubmit={formSubmit}>
                <label>Company Name:</label>
                <input type="text" id="name" name="name" value={name}
                    onChange={(e) => setName(e.target.value)} required /><br />

                <label>Website:</label>
                <input type="text" id="website" name="website" value={website}
                    onChange={(e) => setWebsite(e.target.value)} required /><br />

                <label>Funding Stage:</label>
                <select id="funding_stage" name="funding_stage" value={funding_stage}
                    onChange={(e) => setFunding(e.target.value)} required>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B">Series B</option>
                </select><br /><br />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Companies;