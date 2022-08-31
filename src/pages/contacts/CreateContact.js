import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
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
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newContact = { ...form };

    await fetch("http://localhost:7000/contact/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
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
    });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Create Contact</h3>
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
              type="timestamp"
              className="form-control"
              id="created_at"
              value={form.created_at}
              onChange={(e) => updateForm({ created_at: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Contact"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
