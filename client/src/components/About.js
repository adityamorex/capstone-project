import React from "react";
import { FaCheck } from "react-icons/fa";

const About = () => {
  return (
    <div class="about-container">
    <div id="about" className="about">
      <div className="subDiv">
        <div className="leftCol"></div>
        <div className="rightCol">
          <h2 style={{ fontWeight: "700", color: "#4e1781" }}>
            NU FACIAL RECOGNITION ATTENDANCE SYSTEM
          </h2>
          <p style={{ color: "#666" }}>
            Welcome to NIIT University Facial Attendence System!

            A system for recognizing human faces fast and precisely for
            attendance. It is a web application that can be used by students and faculty to mark attendance. 
          </p>
          <div style={{ marginTop: "3rem" }}>
            <div style={{ display: "flex" }}>
              <div style={{ color: "#4e1781", marginRight: "7px" }}>
                <FaCheck />
              </div>
              <div>
                <h4 style={{ fontWeight: "600", color: "#4e1781" }}>
                  Capstone Project
                </h4>
                <p style={{ color: "#666" }}>
                  Our Capstone Project was Facial Recognition, So we decided to implememt Facial Recognition in the Attendence System. The Web App scans faces of students in few seconds and marks attendance without any error. 
                </p>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ color: "#4e1781", marginRight: "7px" }}>
                <FaCheck />
              </div>
              <div>
                <h4 style={{ fontWeight: "600", color: "#4e1781" }}>
                  Customized for NIIT University
                </h4>
                <p style={{ color: "#666" }}>
                  Our University faces the issue of proxy attendance, the unique feature of using Google OAuth to send code to student's email and then using that code to mark attendance, makes it impossible for students to mark proxy attendance.
                </p>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ color: "#4e1781", marginRight: "7px" }}>
                <FaCheck />
              </div>
              <div>
                <h4 style={{ fontWeight: "600", color: "#4e1781" }}>
                  Our Team
                </h4>
                <p style={{ color: "#666" }}>
                  We are the team 34, the team comprises of Aditya More, Abhimanyu Sharma, Arun Singh Thakur and Priyanshu Singh. We are the students of NIIT University, Neemrana, Rajasthan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
