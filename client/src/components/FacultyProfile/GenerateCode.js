import React, { useState, useEffect } from "react";
import { facultydata } from "./ProfilePage";

let subject, code;

const GenerateCode = () => {
  const [classData, setClassData] = useState({
    subject: "",
    code: "",
  });
  const [generatecode, setGenerateCode] = useState(false);
  const [emailSent, setEmailSent] = useState(null);
  const [alert, setAlert] = useState(true);

  // hiding alert message after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, [alert]);

  let name, value;

  const handleInput = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;

    setClassData({ ...classData, [name]: value });
  };

  const generateCode = () => {
    subject = classData.subject;
    code = classData.code;

    if (!code || !subject) {
      window.alert("Please fill the details properly to generate code");
    } else {
      setGenerateCode(true);
      setAlert(true);
      classData.subject = "";
      classData.code = "";
      console.log(subject);

      saveCode();
    }
  };

  // saving the code generated by the faculty
  const saveCode = async () => {
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().getTime() / (1000 * 60);

    const resp = await fetch("/saveCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        code,
        date,
        time,
      }),
    });

    const codeData = await resp.json();

    if (codeData.message === "data saved") {
      console.log("code generated");
    } else {
      window.alert("Code failed to generate");
    }
  };

  // sending subject and code information to all the students of the department
  const sendEmail = async () => {
    const facultyDepartment = facultydata.department;
    const facultyEmail = facultydata.email;
    const facultyName = facultydata.firstname + facultydata.lastname;

    const resp = await fetch("/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        facultyDepartment,
        facultyEmail,
        subject,
        code,
        facultyName,
      }),
    });

    const response = await resp.json();

    if (response.status === "Email sent") {
      setEmailSent(true);
    } else {
      setEmailSent(false);
    }
  };

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </symbol>
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
      </svg>
      {alert && generatecode && (
        <div
          className="alert alert-success d-flex align-items-center"
          style={{
            marginLeft: "350px",
            marginRight: "4rem",
            marginTop: "2rem",
          }}
          role="alert"
        >
          <svg
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Success:"
          >
            <use xlinkHref="#check-circle-fill" />
          </svg>
          <div>Your Code has been generated</div>
        </div>
      )}
      {emailSent !== null &&
        (emailSent === true ? (
          <div
            className="alert alert-success d-flex align-items-center"
            style={{
              marginLeft: "350px",
              marginRight: "4rem",
              marginTop: "2rem",
            }}
            role="alert"
          >
            <svg
              className="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Success:"
            >
              <use xlinkHref="#check-circle-fill" />
            </svg>
            <div>Email sent successfully</div>
          </div>
        ) : (
          <div
            class="alert alert-danger d-flex align-items-center"
            style={{
              marginLeft: "350px",
              marginRight: "4rem",
              marginTop: "2rem",
            }}
            role="alert"
          >
            <svg
              className="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Danger:"
            >
              <use xlinkHref="#exclamation-triangle-fill" />
            </svg>
            <div>Failed to send email</div>
          </div>
        ))}
<div className="code-container" style={{ marginLeft: "auto", marginRight: "auto", marginTop: "3rem", width: "60%" , height: "60%",padding: "20px"}}>
  <h2 style={{ fontWeight: "bold", textAlign: "center", fontSize: "3rem", fontFamily: "Bebas Neue, sans-serif" }}>
    Generate Code
  </h2>
  <div className="divbox">
    <div className="inputbox">
      <input
        className="inputdiv"
        autoComplete="off"
        type="text"
        id="subject"
        onChange={handleInput}
        value={classData.subject}
        name="subject"
        placeholder="Enter subject"
      />
      <input
        className="inputdiv"
        autoComplete="off"
        type="text"
        id="code"
        onChange={handleInput}
        value={classData.code}
        name="code"
        placeholder="Enter Code"
      />
    </div>
    <div className="textbox" style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#fff" }}>
      Dear Faculty, Please generate class authentication code for Attendance.
    </div>
  </div>
  <div className="btnbox" style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
    <button className="btn btn-success input-btn" style={{ padding: "10px 20px", border: "none", cursor: "pointer", marginRight: "1rem" }} onClick={generateCode}>
      Generate
    </button>
    {generatecode && (
      <button className="btn btn-success" style={{ padding: "10px 20px", border: "none", cursor: "pointer" }} onClick={sendEmail}>
        Send Email
      </button>
    )}
  </div>
</div>


    </>
  );
};

export default GenerateCode;
