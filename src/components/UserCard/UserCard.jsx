import React from "react";
import { MdDoNotDisturb } from "react-icons/md";
import "./UserCard.css";

const UserCard = ({ listUsers }) => {
    // console.log("list??", listUsers);
  return (
    <>
      {listUsers.length == 0 ? (
        <div className="dataBox">
          <MdDoNotDisturb style={{width:'2rem',height:'2rem'}}/>
          <h2>No Data Found</h2>
        </div>
      ) : (
        <div className="card_container">
          {listUsers.map((ele, indx) => {
            return (
              <div className="user_card" key={`card${indx}`}>
                <h2 style={{ textAlign: "center", marginBottom: "0.4rem" }}>
                  {ele.name}
                </h2>
                <p>
                  <strong>Username:</strong> {ele.username}
                </p>
                <p>
                  <strong>Email:</strong> {ele.email}
                </p>
                <p>
                  <strong>Address:</strong> {ele.address.street},
                  {ele.address.suite}, {ele.address.city}, {ele.address.zipcode}
                </p>
                <p>
                  <strong>Phone:</strong> {ele.phone}
                </p>
                <p>
                  <strong>Website:</strong> {ele.website}
                </p>
                <p>
                  <strong>Company:</strong> {ele.company.name}
                </p>
                <p>
                  <strong>Catchphrase:</strong> {ele.company.catchPhrase}
                </p>
                <p>
                  <strong>Business:</strong> {ele.company.bs}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default UserCard;
