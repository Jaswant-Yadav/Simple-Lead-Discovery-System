import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
  const [form, setForm] = useState({
    company_id: '',
    name: '',
    title: '',
    email: '',
    linkedin_url: '',
  });
const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.company_id || !form.email) {
      return setStatus('Company ID and Email are required.');
    }

    try {
      const res = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('Contact added successfully!');
        setForm({ company_id: '', name: '', title: '', email: '', linkedin_url: '' });
      } else {
        setStatus(`Failed: ${data.message}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
    navigate('/dashboard')
  };

  return (
    <div className='addContact'>
      <h2>Add Contact</h2>
      {status && <p>{status}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company ID :- </label>
          <input type="text" name="company_id" value={form.company_id} onChange={handleChange} required />
        </div>
        <div>
          <label>Full Name :- </label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Title :- </label>
          <input type="text" name="title" value={form.title} onChange={handleChange} />
        </div>
        <div>
          <label>Email :- </label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>LinkedIn URL :- </label>
          <input type="url" name="linkedin_url" value={form.linkedin_url} onChange={handleChange} />
        </div>
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default AddContact;
