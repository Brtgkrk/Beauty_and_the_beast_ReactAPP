import React from 'react';
import '../styles/EmployeeTable.css';

const EmployeeTable = ({ employees, onSortChange, sortConfig }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => onSortChange('id')}>
                        ID
                        {sortConfig && sortConfig.key === 'id' && (
                            <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                        )}
                    </th>
                    <th onClick={() => onSortChange('firstName')}>
                        Imię
                        {sortConfig && sortConfig.key === 'firstName' && (
                            <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                        )}
                    </th>
                    <th onClick={() => onSortChange('lastName')}>
                        Nazwisko
                        {sortConfig && sortConfig.key === 'lastName' && (
                            <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                        )}
                    </th>
                    <th onClick={() => onSortChange('dateOfBirth')}>
                        Data urodzenia
                        {sortConfig && sortConfig.key === 'dateOfBirth' && (
                            <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                        )}
                    </th>
                    <th onClick={() => onSortChange('function')}>
                        Funkcja
                        {sortConfig && sortConfig.key === 'function' && (
                            <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                        )}
                    </th>
                    <th onClick={() => onSortChange('experience')}>
                        Doświadczenie
                        {sortConfig && sortConfig.key === 'experience' && (
                            <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                        )}
                    </th>
                </tr>
            </thead>
            <tbody>
                {employees.length > 0 ? (
                    employees.map((employee) => (
                        <tr key={employee.id}>
                            <td className="wide-column-id">{employee.id}</td>
                            <td className="wide-column">{employee.firstName}</td>
                            <td className="wide-column">{employee.lastName}</td>
                            <td className="wide-column-date">{employee.dateOfBirth}</td>
                            <td className="wide-column">{employee.function}</td>
                            <td className="wide-column-xp">{employee.experience}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">Brak danych</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default EmployeeTable;
