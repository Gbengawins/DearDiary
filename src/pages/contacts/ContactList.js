import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Contact = (props) => (
 <tr>
   <td>{props.contact.name}</td>
   <td>{props.contact.birthday}</td>
   <td>{props.contact.phone}</td>
   <td>{props.contact.email}</td>
   <td>{props.contact.address}</td>
   <td>{props.contact.city}</td>
   <td>{props.contact.zip}</td>
   <td>{props.contact.state}</td>
   <td>{props.contact.country}</td>
   <td>{props.contact.position}</td>
   <td>{props.contact.website}</td>
   <td>{props.contact.level}</td>
   <td>{props.contact.created_at}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.contact._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteContact(props.contact._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function ContactList() {
 const [contacts, setContacts] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getContacts() {
     const response = await fetch(`http://localhost:5000/contact/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const contact = await response.json();
     setContacts(contact);
   }
 
   getContacts();
 
   return;
 }, [contacts.length]);
 
 // This method will delete a record
 async function deleteContact(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newContacts = contacts.filter((el) => el._id !== id);
   setContacts(newContacts);
 }
 
 // This method will map out the records on the table
 function contactList() {
   return contacts.map((contact) => {
     return (
       <Contact
         contact={contact}
         deleteContact={() => deleteContact(contact._id)}
         key={contact._id}
       />
     );
   });
 }
 
 // This following section will display the table with the contacts.
 return (
   <div>
     <h3>Contact List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Date of Birth</th>
           <th>Phone</th>
           <th>Email</th>
           <th>Address</th>
           <th>City</th>
           <th>Zip Code</th>
           <th>State</th>
           <th>Country</th>
           <th>Position</th>
           <th>Website</th>
           <th>Level</th>
           <th>Create At</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{contactList()}</tbody>
     </table>
   </div>
 );
}