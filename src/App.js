import React, { useEffect, useState } from 'react';
import './App.css';
import EmployeeTable from './components/EmployeeTable';
import FilterForm from './components/FilterForm';
import Pagination from './components/Pagination';
import jsonData from './database/sluzba.json';

function App() {
  const [employees, setEmployees] = useState(jsonData);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    applyFilters();
  }, [filters]);

  useEffect(() => {
    applySorting();
  }, [sortConfig]);

  useEffect(() => {
    applyPagination();
  }, [currentPage, filteredEmployees]);

  const applyFilters = () => {
    let filteredData = jsonData;

    if (filters.name) {
      filteredData = filteredData.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(filters.name.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.position) {
      filteredData = filteredData.filter(
        (employee) =>
          employee.function.toLowerCase().includes(filters.position.toLowerCase())
      );
    }

    if (filters.dateOfBirth) {
      filteredData = filteredData.filter(
        (employee) => employee.dateOfBirth === filters.dateOfBirth
      );
    }

    setFilteredEmployees(filteredData);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterValues) => {
    setFilters(filterValues);
  };

  const applySorting = () => {
    if (sortConfig.key) {
      const sortedData = [...filteredEmployees].sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (valueA < valueB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });

      setFilteredEmployees(sortedData);
      setCurrentPage(1);
    }
  };

  const handleSortChange = (key) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  const applyPagination = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredEmployees.slice(startIndex, endIndex);

    setEmployees(paginatedData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <header className="App-header">
        <FilterForm onFilterChange={handleFilterChange} />
        <EmployeeTable employees={employees} onSortChange={handleSortChange} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredEmployees.length / pageSize)}
          onPageChange={handlePageChange}
        />
      </header>
    </div>
  );
}

export default App;
