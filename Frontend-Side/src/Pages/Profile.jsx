import React from 'react'

function Profile() {
  return (
    <div>
        <div className="profile-container">

  {/* Header */}
  <div className="profile-header">

    <div className="avatar">
      {patient.name.charAt(0)}
    </div>

    <div>
      <h2>{patient.name}</h2>
      <p>ID : {patient.patientId}</p>

      <div className="contact">
        <span>📧 {patient.email}</span>
        <span>📞 {patient.phone}</span>
      </div>
    </div>

    <span className={`status ${patient.status.toLowerCase()}`}>
      {patient.status}
    </span>

  </div>


  {/* Personal */}
  <div className="card">

    <h3>Personal Information</h3>

    <div className="grid">

      <div>
        <label>Age</label>
        <p>{patient.age}</p>
      </div>

      <div>
        <label>Gender</label>
        <p>{patient.gender}</p>
      </div>

      <div>
        <label>Blood Group</label>
        <p>{patient.bloodGroup}</p>
      </div>

      <div>
        <label>Disease</label>
        <p>{patient.disease}</p>
      </div>

    </div>

  </div>


  {/* Medical */}

  <div className="card">

    <h3>Medical Information</h3>

    <div className="grid">

      <div>
        <label>Doctor</label>
        <p>{patient.doctor}</p>
      </div>

      <div>
        <label>Admission</label>
        <p>{patient.admissionDate}</p>
      </div>

      <div>
        <label>Status</label>

        <span className={`badge ${patient.status.toLowerCase()}`}>
          {patient.status}
        </span>

      </div>

    </div>

  </div>


  {/* Buttons */}

  <div className="buttons">

    <button>Edit Profile</button>

    <button>Download Report</button>

    <button>Book Appointment</button>

  </div>

</div>
    </div>
  )
}

export default Profile
