import React, { useState } from 'react';
import './App.css';
import image from "./a.png"

function App() {
  const [id, setId] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    excludedDate: '',
    leadCount: '',
    expectedDDR: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const insert = () => {
    const {
      startDate,
      endDate,
      excludedDate,
      leadCount,
    } = formData;

    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const Month = date1.getMonth() +1;
    const date3 = new Date(excludedDate);
    const time2 = Math.abs(date3 - date1);
    const numberOfDays = Math.ceil(time2 / (1000 * 60 * 60 * 24));
    const date = new Date();
    const lastUpdate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    const expectedDDR = Math.ceil(leadCount/numberOfDays);
    if (date1 >= date2 || date1 >= date3 ){
      alert("Sorry,  Date has been fetched incorrectly");
    } 
    else if (startDate ==="" || endDate === "" || excludedDate === "" || expectedDDR === ""){
      alert("Sorry,  Data has not been fetched correctly");
    }
    else {
      const newRow = {
        id: id + 1,
        startDate,
        endDate,
        Month,
        excludedDate,
        numberOfDays,
        leadCount,
        expectedDDR,
        lastUpdate,
      };

      setTableData([...tableData, newRow]);
      setId(id + 1);

      // Clear the form data after adding a new row
      setFormData({
        startDate: '',
        endDate: '',
        excludedDate: '',
        leadCount: '',
      });
    }
  };

  const removeRow = (id) => {
    const updatedTableData = tableData.filter((row) => row.id !== id);
    setTableData(updatedTableData);
  };

  const resetForm = () => {
    setFormData({
      startDate: '',
      endDate: '',
      excludedDate: '',
      leadCount: '',
      expectedDDR: '',
    });
  };

  return (
    <div className="app">
      <div className='logo'><img src={image} height={100} width={100} alt='logo'/> <span> - Daily Run Rate</span></div>
      <table className="tbl" border="1">
        <thead>
          <tr>
            <th>Action</th>
            <th>ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Month,Year</th>
            <th>Date Excluded</th>
            <th>Number of Days</th>
            <th>Lead Count</th>
            <th>Expected DDR</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody id="tb2">
          <tr>
            <th></th>
            <th></th>
            <th>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </th>
            <th>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </th>
            <th></th>
            <th>
              <input
                type="date"
                name="excludedDate"
                id="excludedDate"
                value={formData.excludedDate}
                onChange={handleInputChange}
              />
            </th>
            <th></th>
            <th>
              <input
                type="text"
                name="leadCount"
                id="leadCount"
                value={formData.leadCount}
                onChange={handleInputChange}
              />
            </th>
            <th>
              {/* <input
                type="text"
                name="expectedDDR"
                id="expectedDDR"
                value={formData.expectedDDR}
                onChange={handleInputChange}
                disabled
              /> */}
            </th>
            <th>
              <button onClick={insert}>SAVE</button>
              <button onClick={resetForm}>cancel</button>
            </th>
          </tr>
        </tbody>
        <tbody id="tb2">
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>
                <button onClick={() => removeRow(row.id)}>cancel</button>
              </td>
              <td>{row.id}</td>
              <td>{row.startDate}</td>
              <td>{row.endDate}</td>
              <td>{row.Month}</td>
              <td>{row.excludedDate}</td>
              <td>{row.numberOfDays}</td>
              <td>{row.leadCount}</td>
              <td>{row.expectedDDR}</td>
              <td>{row.lastUpdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>Made by - Shivam</footer>
    </div>
  );
}

export default App;
