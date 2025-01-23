import React, { useState } from 'react';
import './App.css';
import { MdLocationOn } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CiCalendarDate } from 'react-icons/ci';
import axios from 'axios';

export default function App() {
  const [selectedOptionOne, setSelectedOptionOne] = useState('');
  const [selectedOptionSec, setSelectedOptionSec] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectUnit, setSelectUnit] = useState('');
  const [containerDropdown, setContainerDropdown] = useState('');
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [searchStartData, setSearchStartData] = useState([]);
  const [searchStartQuery, setSearchStartQuery] = useState('');
  const [dropShowStart, setStartdropShow] = useState(false);
  const [searchEndData, setSearchEndData] = useState([]);
  const [searchEndQuery, setSearchEndQuery] = useState('');
  const [dropShowEnd, setEndDropShow] = useState(false);


  const handlerContainer = (event) => setContainerDropdown(event.target.value);
  const handleRadioChangeOne = (event) => setSelectedOptionOne(event.target.value);
  const handleRadioChangeTwo = (event) => setSelectedOptionSec(event.target.value);
  const handleRadioChangeUnit = (event) => setSelectUnit(event.target.value);


  const HAndlerInputStart = async (event) => {
    const query = event.target.value;
    setSearchStartQuery(query);

    if (query.length >= 3) {
      try {
        const rsp = await axios.get(`https://665d-206-42-124-208.ngrok-free.app/location?search=${query}`);
        setSearchStartData(rsp.data.locations);
        setStartdropShow(true);
      } catch (error) {
        console.error('Error ---->> data:', error.message);
        setSearchStartData([]);
        setStartdropShow(false);
      }
    } else {
      setStartdropShow(false);
      setSearchStartData([]);
    }
  };

  const HandlerInputENd = async (event) => {
    const query = event.target.value;
    setSearchEndQuery(query);

    if (query.length >= 3) {
      try {
        const rsp = await axios.get(`https://665d-206-42-124-208.ngrok-free.app/location?search=${query}`);
        setSearchEndData(rsp.data.locations);
        setEndDropShow(true);
      } catch (error) {
        console.error('Error ---->> data:', error.message);
        setSearchEndData([]);
        setEndDropShow(false);
      }
    } else {
      setEndDropShow(false);
      setSearchEndData([]);
    }
  };

  const ItemClickEnd = (item) => {
    setSearchEndQuery(`${item.businessLocationName} - ${item.businessLocode}`);
    setEndDropShow(false);
    setSearchEndData([]);

  };


  const ItemClickStart = (item) => {
    setSearchStartQuery(`${item.businessLocationName} - ${item.businessLocode}`);
    setStartdropShow(false);
    setSearchStartData([]);
  };


  return (
    <div className="card">
      <div className="mainView">
        <h3>Routing</h3>
        <div className="sections">
          <div className="section">
            <p className="subTxt">Start Location</p>
            <div className="inptBox">
              <MdLocationOn />
              <input
                style={{ width: '90%', border: 'none', outline: 'none', marginLeft: '5px' }}
                type="text"
                id="start-location"
                placeholder="Enter Start Location"
                value={searchStartQuery}
                onChange={HAndlerInputStart}
              />
              {dropShowStart ? (
                <div className="searchData">
                  {searchStartData.map((item, index) => (
                    <div
                      key={index}
                      className="searchItem"
                      onClick={() => ItemClickStart(item)}
                      style={{
                        cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ccc',
                      }}
                    >
                      <p className="itemTxt">
                        {item.businessLocationName} - <span>{item.businessLocode}</span>
                      </p>
                      <p style={{ fontSize: 12, fontWeight: 400 }}>
                        {item.country} {item.businessPostalCode}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>


            <label>
              <input
                type="radio"
                value="option1"
                checked={selectedOptionOne === 'option1'}
                onChange={handleRadioChangeOne}
              />
              Received at Your Door
            </label>
            <label>
              <input
                type="radio"
                value="option2"
                checked={selectedOptionOne === 'option2'}
                onChange={handleRadioChangeOne}
              />
              Received at Terminal/Ramp
            </label>
          </div>
          <div className="section">
            <p className="subTxt">End Location</p>
            <div className="inptBox">
              <MdLocationOn />
              <input
                style={{ width: "90%", border: "none", outline: "none", marginLeft: "5px" }}
                type="text"
                id="end"
                placeholder="Enter End Location"
                value={searchEndQuery}
                onChange={HandlerInputENd} />

              {dropShowEnd ? (
                <div className="searchData">
                  {searchStartData.map((item, index) => (
                    <div
                      key={index}
                      className="searchItem"
                      onClick={() => ItemClickEnd(item)}
                      style={{
                        cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ccc',
                      }}
                    >
                      <p className="itemTxt">
                        {item.businessLocationName} - <span>{item.businessLocode}</span>
                      </p>
                      <p style={{ fontSize: 12, fontWeight: 400 }}>
                        {item.country} {item.businessPostalCode}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <label>
              <input
                type="radio"
                value="option3"
                checked={selectedOptionSec === 'option3'}
                onChange={handleRadioChangeTwo}
              />
              Delivered at Your Door
            </label>
            <label>
              <input
                type="radio"
                value="option4"
                checked={selectedOptionSec === 'option4'}
                onChange={handleRadioChangeTwo}
              />
              Delivered at Terminal/Ramp
            </label>
          </div>
        </div>
      </div>

      <div className="mainView">
        <h3>Validity Date</h3>
        <p className="subTxt">Valid From</p>
        <div className="dateMain">
          <CiCalendarDate className="calendarIcon" />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Choose a date"
            className="customDatePicker"
          />
        </div>
      </div>


      <div className="mainView">
        <h3>Container and Commodity</h3>

        <div className="sections">
          <div className="dropdownSection">
            <p className="subTxt">Container Type</p>
            <select
              value={containerDropdown}
              onChange={handlerContainer}
              className="dropdown"
            >
              {/* <option value="" disabled>
                Select an option
              </option> */}
              <option value="20-general-purpose">20' General Purpose</option>
              <option value="40-general-purpose">40' General Purpose</option>
              <option value="40-general-purpose-high-cube">40' General Purpose High Cube</option>
              <option value="20-operating-reefer">20' Operating Reefer</option>
              <option value="40-operating-reefer">40' Operating Reefer</option>
              <option value="40-non-operating-reefer">40' Non-operating Reefer</option>
              <option value="20-open-top-in-gauge">20' Open Top (in-gauge)</option>
              <option value="40-open-top-in-gauge">40' Open Top (in-gauge)</option>
              <option value="20-flatrack-in-gauge">20' Flatrack (in-gauge)</option>
              <option value="40-flatrack-in-gauge">40' Flatrack (in-gauge)</option>
              <option value="40-high-cube-flatrack-in-gauge">40' High Cube Flatrack (in-gauge)</option>
              <option value="20-high-cube-open-top-in-gauge">20' High Cube Open Top (in-gauge)</option>
              <option value="40-high-cube-open-top-in-gauge">40' High Cube Open Top (in-gauge)</option>
              <option value="40-high-cube-hard-top-in-gauge">40' High Cube Hard Top (in-gauge)</option>
            </select>
          </div>

          <div className="dropdownSection">
            <p className="subTxt">Container Quantity</p>
            <div className="inptBox2">
              <input
                style={{ width: "90%", border: "none", outline: "none", marginLeft: "5px" }}

                type="text"
                id="quantity"
                placeholder="Enter Container Quantity"
              />
            </div>
          </div>

          <div className="dropdownSection">
            <p className="subTxt">Weight per Container</p>
            <div className="inptBox2">
              <input
                style={{ width: "90%", border: "none", outline: "none", marginLeft: "5px" }}

                type="text"
                id="Weight"
                placeholder="Enter Weight per Container"
              />
            </div>
          </div>

          <div >
            <p className='subTxt'>Select Units</p>

            <div className='unitContainer'>
              <label>
                <input
                  type="radio"
                  value="kg"
                  checked={selectUnit === 'kg'}
                  onChange={handleRadioChangeUnit}
                />
                Kg
              </label>
              <label>
                <input
                  type="radio"
                  value="lb"
                  checked={selectUnit === 'lb'}
                  onChange={handleRadioChangeUnit}
                />
                Lb
              </label>
            </div>
          </div>


        </div>

        <div>
          <div className="checkboxContainer" onClick={() => setIsChecked1(!isChecked1)}          >
            <div className={`checkbox ${isChecked1 ? "checked" : ""}`}>
              {isChecked1 && <span className="checkmark">✔</span>}
            </div>
            <p className="label">
              Include Alternative Container Sizes
            </p>
          </div>

          <div className="checkboxContainer" onClick={() => setIsChecked2(!isChecked2)}          >
            <div className={`checkbox ${isChecked2 ? "checked" : ""}`}>
              {isChecked2 && <span className="checkmark">✔</span>}
            </div>
            <p className="label">Dangerous Goods</p>
          </div>
        </div>

        <div className="dropdownSection">
          <p className="subTxt">Commodity</p>
          <select value={containerDropdown} onChange={handlerContainer} className="dropdown"          >
            <option value="" disabled> FAK - Freight of All Kinds </option>
          </select>
        </div>

      </div>

      <button className="btn">Submit</button>
    </div>
  );
}
