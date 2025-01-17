import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
    const { store, actions } = useContext(Context);
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const selectedContact = store.contacts.find(contact => contact.id === parseInt(id));
            if (selectedContact) {
                setContact({
                    name: selectedContact.name,
                    email: selectedContact.email,
                    phone: selectedContact.phone,
                    address: selectedContact.address
                });
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await actions.updateContact(parseInt(id), contact);
        } else {
            await actions.createContact(contact);
        }
        navigate("/");
    };

    return (
        <div className="container">
            <div>
                <h1 className="text-center mt-5">{id ? "Edit Contact" : "Add a New Contact"}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="form-control" placeholder="Full Name" name="name" value={contact.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Email" name="email" value={contact.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="phone" className="form-control" placeholder="Phone #" name="phone" value={contact.phone} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" placeholder="Address" name="address" value={contact.address} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary form-control">{id ? "Update" : "Save"}</button>
                    <Link className="mt-3 w-100 text-center" to="/">Back to Contacts</Link>
                </form>
            </div>
        </div>
    );
};