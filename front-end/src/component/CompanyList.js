import React, { useEffect, useState } from "react";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/companies", {
      credentials: "include", // if using session-based login
    })
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="ContactList">
      <h2>Companies</h2>
      {loading ? (
        <p>Loading...</p>
      ) : companies.length === 0 ? (
        <p>No companies found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Website</th>
              <th>Funding Stage</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.website}</td>
                <td>{company.funding_stage}</td>
                <td>{company.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br /><br />
       <a href="/dashboard">Dashboard</a>
    </div>
  );
};

export default CompanyList;
