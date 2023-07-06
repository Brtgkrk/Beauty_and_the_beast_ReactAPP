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

    if (filters.id) {
      filteredData = filteredData.filter(
        (employee) =>
          employee.id == filters.id
      );
    }

    if (filters.name) {
      filteredData = filteredData.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.lastName) {
      filteredData = filteredData.filter(
        (employee) =>
          employee.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
      );
    }

    if (filters.position) {
      filteredData = filteredData.filter(
        (employee) =>
          employee.function.toLowerCase().includes(filters.position.toLowerCase())
      );
    }

    if (filters.experience) {
      filteredData = filteredData.filter(
        (employee) =>
          employee.experience == filters.experience
      );
    }

    if (filters.dateOfBirth) {
      const filterDate = new Date(filters.dateOfBirth);
      const filterDay = filterDate.getDate();
      const filterMonth = filterDate.getMonth() + 1;
      const filterYear = filterDate.getFullYear();

      filteredData = filteredData.filter((employee) => {
        const employeeDate = new Date(employee.dateOfBirth);
        const employeeDay = employeeDate.getDate();
        const employeeMonth = employeeDate.getMonth() + 1;
        const employeeYear = employeeDate.getFullYear();

        return (
          filterDay === employeeMonth &&
          filterMonth === employeeDay &&
          filterYear === employeeYear
        );
      });
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
        const valueA = sortConfig.key === 'dateOfBirth' ? parseDate(a.dateOfBirth) : a[sortConfig.key];
        const valueB = sortConfig.key === 'dateOfBirth' ? parseDate(b.dateOfBirth) : b[sortConfig.key];

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

  const parseDate = (dateString) => {
    const [date, time] = dateString.split(' ');
    const [day, month, year] = date.split('.');
    const [hours, minutes] = time.split(':');

    return new Date(year, month - 1, day, hours, minutes);
  };



  const handleSortChange = (key) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    console.log(`key: ${key} direction: ${direction}`);
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
        <EmployeeTable employees={employees} sortConfig={sortConfig} onSortChange={handleSortChange} />
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
