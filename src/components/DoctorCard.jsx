import React from 'react';
import './DoctorCard.css'; // if you want to style separately

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
      <div className="doctor-info">
        <h2>{doctor.name}</h2>
        <p className="speciality">
          {doctor.specialities.map(s => s.name).join(', ')}
        </p>
        <p className="experience">{doctor.experience}</p>
        <p className="fees">Fees: {doctor.fees}</p>
        <p className="doctor-introduction">{doctor.doctor_introduction}</p>
        <p className="clinic">{doctor.clinic.name}</p>
        <p className="address">
          {doctor.clinic.address.address_line1}, {doctor.clinic.address.locality}, {doctor.clinic.address.city}
        </p>
        <div className="consult-types">
          {doctor.video_consult && <span>📹 Video Consult</span>}
          {doctor.in_clinic && <span>🏥 In-Clinic</span>}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
