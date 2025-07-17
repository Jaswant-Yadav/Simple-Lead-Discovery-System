import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './component/Login';
import Dashboard from './component/Dashboard';
import Companies from './component/companies';
import CompanyList from './component/CompanyList';
import EnrichCompany from './component/EnrichCompany';
import AddContact from './component/AddContact';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/addcompanies' element={<Companies />} />
          <Route path='/companieslist' element={<CompanyList />} />
          <Route path='/enrich' element={<EnrichCompany />} />
          <Route path='/addContact' element={<AddContact />} />
        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;
