import React, { useState, useEffect } from 'react';
import { fetchDoctors } from './api'; // Assume api.js handles fetching the doctor data
import './App.css'; // Add your CSS styles here


const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [consultType, setConsultType] = useState(''); // Video Consult / In Clinic
  const [specialities, setSpecialities] = useState([]); // Multi-checkbox filter
  const [sortOption, setSortOption] = useState(''); // Sorting filter

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleConsultTypeChange = (e) => {
    setConsultType(e.target.value);
  };

  const handleSpecialityChange = (e) => {
    const { options } = e.target;
    const selectedSpecialities = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedSpecialities.push(options[i].value);
      }
    }
    setSpecialities(selectedSpecialities);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    let filteredData = doctors.filter((doctor) => {
      // Filter by search query
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.doctor_introduction
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      // Filter by consult type
      const matchesConsultType =
        consultType === '' || doctor.consult_type === consultType;

      // Filter by specialities
      const matchesSpecialities =
        specialities.length === 0 ||
        doctor.specialities.some((speciality) =>
          specialities.includes(speciality.name)
        );

      return matchesSearch && matchesConsultType && matchesSpecialities;
    });

    // Sorting
    if (sortOption === 'fees') {
      filteredData = filteredData.sort((a, b) => parseInt(a.fees) - parseInt(b.fees));
    } else if (sortOption === 'experience') {
      filteredData = filteredData.sort(
        (a, b) => parseInt(b.experience) - parseInt(a.experience)
      );
    }

    setFilteredDoctors(filteredData);
  }, [searchQuery, consultType, specialities, sortOption, doctors]);

  const specialitiesOptions = [...new Set(doctors.flatMap((doctor) => doctor.specialities.map((s) => s.name)))];

  return (
      <div className="app">
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search doctors"
        value={searchQuery}
        onChange={handleSearch}
        data-testid="autocomplete-input" // Add data-testid here
      />
    </div>

    {/* Dynamic Filter Panel */}
    <div className="filter-panel">
      {/* Consult Type - Dropdown */}
      <div className="filter-item">
        <label>Consult Type</label>
        <select onChange={handleConsultTypeChange} value={consultType}>
          <option value="">All</option>
          <option value="videoConsult">Video Consult</option>
          <option value="inClinic">In Clinic</option>
        </select>
      </div>

      {/* Specialities - Multi Dropdown */}
      <div className="filter-item">
        <label>Specialities</label>
        <select multiple onChange={handleSpecialityChange} value={specialities}>
          {specialitiesOptions.map((speciality) => (
            <option key={speciality} value={speciality} data-testid="speciality-option">
              {speciality}
            </option>
          ))}
        </select>
      </div>

      {/* Sort By - Dropdown */}
      <div className="filter-item">
        <label>Sort By</label>
        <select onChange={handleSortChange} value={sortOption}>
          <option value="">Select</option>
          <option value="fees">Fees (Low to High)</option>
          <option value="experience">Experience (High to Low)</option>
        </select>
      </div>
    </div>

    <div className="doctor-list">
      <div className="doctor-grid">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card" data-testid="doctor-card"> {/* Wrapper for doctor card */}
            <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
            <div className="doctor-info">
              <h2 data-testid="doctor-name">{doctor.name}</h2> {/* Doctor's name */}
              <p data-testid="doctor-specialty" className="speciality">
                {doctor.specialities.map((spec) => spec.name).join(', ')} {/* Doctor's specialty */}
              </p>
              <p data-testid="doctor-experience" className="experience">{doctor.experience} years</p> {/* Experience info */}
              <p className="fees">{doctor.fees}</p>
              <p className="clinic">{doctor.clinic.name}, {doctor.clinic.address.locality}</p>
              <p className="consult-types">
                {doctor.video_consult && <span>Video Consult</span>}
                {doctor.in_clinic && <span>In Clinic</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  );
};

export default App;
