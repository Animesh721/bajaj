import React, { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard';
import { fetchDoctors } from '../api';

const DoctorList = ({ searchQuery }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDoctors = async () => {
      const doctorData = await fetchDoctors();
      setDoctors(doctorData);
      setLoading(false);
    };
    getDoctors();
  }, []);

  if (loading) {
    return <div>Loading doctors...</div>;
  }

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="doctor-list">
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))
      ) : (
        <div>No doctors found. Showing all doctors:</div>
      )}
      {/* If search query is empty or no matches, show all doctors in a scrollable flex grid */}
      {searchQuery === '' && (
        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
