import React, { useEffect, useState } from 'react';

const EnrichCompany = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/contacts');
                const data = await res.json();
                setContacts(data);
                setFilteredContacts(data);
            } catch (err) {
                setStatus('Failed to load contacts.');
            }
        };

        fetchContacts();
    }, []);

    useEffect(() => {
        const filtered = contacts.filter((contact) =>
            [contact.name, contact.title, contact.email]
                .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredContacts(filtered);
    }, [searchTerm, contacts]);

    return (
        <div className='ContactList'>
            <h2>Contact List</h2>
            {status && <p>{status}</p>}

            <input
                type="text"
                placeholder="Search by name, title, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}

            />

            <table border="1" cellPadding="10" >
                <thead>
                    <tr>
                        <th>Company ID</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Email</th>
                        <th>LinkedIn</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map((c, index) => (
                        <tr key={index}>
                            <td>{c.company_id}</td>
                            <td>{c.name}</td>
                            <td>{c.title}</td>
                            <td>{c.email}</td>
                            <td><a href="linkedin" target="_blank" rel="noreferrer">{c.linkedin_url}</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br /><br />
            <a href="/dashboard">Dashboard</a>
        </div>
    );
};

export default EnrichCompany;
