import React, { useEffect, useState } from "react";
import NavBar from "./NavBar/NavBar";
import UserCard from "./UserCard/UserCard";
import axios from "axios";
import { IoSearchSharp } from "react-icons/io5";
import { config } from "../App";
import "./UserListPage/UserListPage.css";

const UserListPage = () => {
  const [userData, setUserData] = useState([]);
  const [filterValue, setFilterValue] = useState([]);
  const [srchHistory, setSrchHistory] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(0);
  const [sortedOrder, setSortOrder] = useState([]);
  const [isDisplay, setIsDisplay] = useState(null);
  const [value, setValue] = useState([]);

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await axios.get(`${config.endpoint}`);
        // console.log(response.data);
        setUserData(response.data);

        const getHistory = localStorage.getItem("searchItemsHist");
        if (getHistory) {
          setSrchHistory(JSON.parse(getHistory));
        }
      } catch (error) {
        alert(error);
      }
    }

    fetchUserList();
  }, []);

  // console.log(srchHistory);
  const srchDebounce = (e, debounceTimeout) => {
    let val = e.target.value;

    if (debounceTimeout) {
      clearInterval(debounceTimeout);
    }

    const timerId = setTimeout(() => {
      handleInpChange(val);
    }, 800);

    setDebounceTimeout(timerId);
  };

  function handleInpChange(val) {
    // console.log(val);
    setValue(val);
    // if (sortedOrder.length) setSortOrder([]);
    const srchUpdate = [...srchHistory, val];
    localStorage.setItem("searchItemsHist", JSON.stringify(srchUpdate));
    setSrchHistory([...srchHistory, val]);
    let lowerVal = val.toLowerCase();

    const result = userData.filter((ele) =>
      ele.name.toLowerCase().includes(lowerVal)
    );

    setFilterValue(result);
  }

  function handleSortClick(e) {
    // console.log(e.target.value);
    if (filterValue.length) setFilterValue([]);
    if (value.length) setValue([]);
    let sortOrder = e.target.value;
    if (sortOrder != "--sort-name-by--") {
      let data = [...userData];
      data.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortOrder == "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });

      // console.log(userData);
      setSortOrder(data);
    }
    return;
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <form className="formBox">
          <input
            placeholder="Enter user name sorting here..."
            className="inputStyler"
            onFocus={() => setIsDisplay(true)}
            onBlur={() => setIsDisplay(false)}
            onChange={(e) => srchDebounce(e, debounceTimeout)}
          />
          <IoSearchSharp className="svgSrchIcon" />

          <div className="selectBox">
            <label style={{ color: "black" }}>Name:</label>
            <select onClick={(e) => handleSortClick(e)}>
              <option selected disabled>
                --sort-name-by--
              </option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </form>

        {filterValue.length || value.length ? (
          <UserCard listUsers={filterValue} />
        ) : sortedOrder.length ? (
          <UserCard listUsers={sortedOrder} />
        ) : (
          <UserCard listUsers={userData} />
        )}
      </div>
      {isDisplay == true && srchHistory.length ? (
        <div className="displBox">
          {srchHistory.length ? (
            <div className="histryBox">
              {srchHistory.map((ele, indx) => {
                return (
                  <div key={`list${indx}`}>
                    <h4>{ele}</h4>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserListPage;
