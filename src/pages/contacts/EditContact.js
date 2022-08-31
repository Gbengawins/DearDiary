import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
  name: "",
  birthday: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  state: "",
  country: "",
  position: "",
  website: "",
  level: "",
  created_at: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:7000/contact/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const contact = await response.json();
     if (!contact) {
       window.alert(`Contact with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(contact);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedContact = {
     name: form.name,
     birthday: form.birthday,
     phone: form.phone,
     email: form.email,
     address: form.address,
     city: form.city,
     zip: form.zip,
     state: form.state,
     country: form.country,
     position: form.position,
     website: form.website,
     level: form.level,
     created_at: form.created_at,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:7000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedContact),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Contact</h3>
     <form onSubmit={onSubmit}>
     <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthday">Date of Birth</label>
          <input
            type="text"
            className="form-control"
            id="birthday"
            value={form.birthday}
            onChange={(e) => updateForm({ birthday: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="phone"
            className="form-control"
            id="phone"
            value={form.phone}
            onChange={(e) => updateForm({ phone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={form.address}
            onChange={(e) => updateForm({ address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={form.city}
            onChange={(e) => updateForm({ city: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="zip">Zip Code</label>
          <input
            type="number"
            className="form-control"
            id="zip"
            value={form.zip}
            onChange={(e) => updateForm({ zip: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            value={form.state}
            onChange={(e) => updateForm({ state: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            value={form.country}
            onChange={(e) => updateForm({ country: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            className="form-control"
            id="website"
            value={form.website}
            onChange={(e) => updateForm({ website: e.target.value })}
          />
        </div>
        
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionProfessional"
              value="Professional"
              checked={form.level === "Professional"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionProfessional" className="form-check-label">
              Professional
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionFriendly"
              value="Friendly"
              checked={form.level === "Friendly"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionFriendly" className="form-check-label">
              Friendly
            </label>
          </div>
          <div className="form-group">
          <label htmlFor="created_at">Created At:</label>
          <input
            type="text"
            className="form-control"
            id="created_at"
            value={form.created_at}
            onChange={(e) => updateForm({ created_at: e.target.value })}
          />
        </div>
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Contact"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
};