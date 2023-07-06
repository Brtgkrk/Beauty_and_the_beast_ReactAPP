import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/FilterForm.css';

const FilterForm = ({ onFilterChange }) => {
  const [idFilter, setIdFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [dateOfBirthFilter, setDateOfBirthFilter] = useState(null);

  const handleIdFilterChange = (e) => {
    setIdFilter(e.target.value);
    onFilterChange({ id: e.target.value });
  };
  
  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
    onFilterChange({ name: e.target.value });
  };

  const handleLastNameFilterChange = (e) => {
    setLastNameFilter(e.target.value);
    onFilterChange({ lastName: e.target.value });
  };

  const handlePositionFilterChange = (e) => {
    setPositionFilter(e.target.value);
    onFilterChange({ position: e.target.value });
  };

  const handleExperienceFilterChange = (e) => {
    setExperienceFilter(e.target.value);
    onFilterChange({ experience: e.target.value });
  };

  const handleDateOfBirthFilterChange = (date) => {
    setDateOfBirthFilter(date);
    onFilterChange({ dateOfBirth: date });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filtruj po id"
        value={idFilter}
        onChange={handleIdFilterChange}
        className="filter-input"
      />
      <input
        type="text"
        placeholder="Filtruj po imieniu"
        value={nameFilter}
        onChange={handleNameFilterChange}
        className="filter-input"
      />
      <input
        type="text"
        placeholder="Filtruj po nazwisku"
        value={lastNameFilter}
        onChange={handleLastNameFilterChange}
        className="filter-input"
      />
      <DatePicker
        selected={dateOfBirthFilter}
        onChange={handleDateOfBirthFilterChange}
        placeholderText="Filtruj po dacie urodzenia"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        dateFormat="dd.MM.yyyy"
        className="filter-input"
      />
      <input
        type="text"
        placeholder="Filtruj po stanowisku"
        value={positionFilter}
        onChange={handlePositionFilterChange}
        className="filter-input"
      />
      <input
        type="text"
        placeholder="Filtruj po doświadczeniu"
        value={experienceFilter}
        onChange={handleExperienceFilterChange}
        className="filter-input"
      />
    </div>
  );
};

export default FilterForm;
