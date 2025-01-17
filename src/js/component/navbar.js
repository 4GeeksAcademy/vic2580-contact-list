import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
		<Link to="/">
			<span className="navbar-brand">Contact List</span>
		</Link>
    	<div className="container-fluid justify-content-end mx-4">
        	<Link to="/add-new-contact" className="text-decoration-none">
          	<button className="btn btn-success px-3">Add New Contact</button>
        	</Link>
      	</div>
    </nav>
  );
};