// src/components/Sidebar.js
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./sidebar.css"


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="sidebar">
            
        <Nav className="flex-column">
        <h4 className="text-center">Categories</h4>
        <Nav.Link href="Television">Television</Nav.Link>
        <Nav.Link href="Computer">Computer</Nav.Link>
        <Nav.Link href="Laptops">Laptops</Nav.Link>
        <Nav.Link href="Mobile">Mobile</Nav.Link>
        <Nav.Link href="HomeApliances">HomeApliances</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
