import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterForm = ({ onFilterChange }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [dateOfBirthFilter, setDateOfBirthFilter] = useState(null);

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
    onFilterChange({ name: e.target.value });
  };

  const handlePositionFilterChange = (e) => {
    setPositionFilter(e.target.value);
    onFilterChange({ position: e.target.value });
  };

  const handleDateOfBirthFilterChange = (date) => {
    setDateOfBirthFilter(date);
    onFilterChange({ dateOfBirth: date });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filtruj po imieniu lub nazwisku"
        value={nameFilter}
        onChange={handleNameFilterChange}
      />
      <input
        type="text"
        placeholder="Filtruj po stanowisku"
        value={positionFilter}
        onChange={handlePositionFilterChange}
      />
      <DatePicker
        selected={dateOfBirthFilter}
        onChange={handleDateOfBirthFilterChange}
        placeholderText="Filtruj po dacie urodzenia"
      />
    </div>
  );
};

export default FilterForm;
