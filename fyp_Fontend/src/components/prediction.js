import React, { useState } from 'react';
import backgroundImage from './w-5.jpg';
import { ref as ref2, set, onValue } from "firebase/database";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { rtDatabase } from "../firebase";

function Prediction() {
  const [question, setQuestion] = useState('');
  const [results, setResults] = useState('');
  const [results2, setResults2] = useState('');
  const [secondresults, secondsetResults] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [isChecked, setIsChecked] = useState(false);


  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
  }



  const handleSubmit = () => {
    set(ref2(rtDatabase, "react/"), {
      question: question,
      answer01: "",
      answer02: "",
      lntype: language
    });

    const reslutref = ref2(rtDatabase, "react/");
    onValue(reslutref, (snapshot) => {
      const data = snapshot.val();

      if (data.answer01 === "") {
        setResults("Please wait for a response.");
      } else {
        setResults(`${data.answer01} `);
        setResults2(`${data.answer02}`);
        
      }

       
    });
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const storage = getStorage();
    const storageRef = ref(storage);
    const folderRef = ref(storageRef, 'database');

    const listAllRes = await listAll(folderRef);
    const fileFil = listAllRes.items.filter(file => file.name.toLowerCase().includes(searchQuery.trim().toLowerCase()));

    try {
      const downloadURL = await getDownloadURL(fileFil[0]);

      // Download the file
      const link = document.createElement('a');
      link.href = downloadURL;
      link.target = "_blank";
      link.setAttribute('download', searchQuery);
      document.body.appendChild(link);
      link.click();
      link.remove();

      secondsetResults("File has the System  .");
    } catch (error) {
      console.log(error);
      secondsetResults("File not found.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "170px",
        height: "150vh",
      }}
    >
      <div
        style={{
          display: "flex",
          paddingTop: "50px",
          color: "white",
          marginTop: "10px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Final Prediction.</h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: "50px",
          marginTop: "30px",
        }}
      >
        <p style={{ marginRight: "20px" }}>Select your desired Language -:</p>
        <label>
          <input
            type="radio"
            name="language"
            value="sinhala"
            checked={language === 'sinhala'}
            onChange={() => setLanguage('sinhala')}
          />
          Sinhala
        </label>
        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            name="language"
            value="english"
            checked={language === 'english'}
            onChange={() => setLanguage('english')}
          />
          English
        </label>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label
          style={{
            marginBottom: "10px",
            paddingTop: "30px",
            fontSize: "20px",
          }}
        >
          Enter your question:
          <input
  style={{
    marginLeft: "50px",
    width: "1100px",
    height: "100px",
    padding: "5px",
  }}
  type="text"
  name="question"
  value={question}
  onChange={(event) => setQuestion(event.target.value)}
/>

        </label>
        <button
          style={{
            marginTop: "50px",
            marginLeft: "1000px",
            width: "100px",
            height: "50px",
            borderRadius: "20px",
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <label style={{ marginTop: "10px", fontSize: "20px" }}>Final Results:</label>
      <output
        style={{
          width: "95%",
          height: "300px",
          marginTop: "10px",
          padding: "10px",
          border: "1px solid black",
          color: "white",
          overflowY: "auto",
        }}
        name="results"
      >
        {results}
      </output>

      <div className="extraInfo" style={{ paddingTop: "20PX" }}>
            <label style={{ color: "white" }}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
              Do you want to know move details click here :{" "}
              {isChecked ? results2 : ""}
              {console.log(isChecked)}
            </label>
          </div>

      
      {/* <output
        style={{
          width: "95%",
          height: "300px",
          marginTop: "10px",
          padding: "10px",
         // border: "1px solid black",
          color: "white",
          overflowY: "auto",
        }}
        name="results2"
      >
        {results2}
      </output> */}

      <p style={{ marginTop: "50px", fontSize: "18px" }}>
        Enter your search term in the field below to find results:
      </p>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
        onSubmit={handleSearch}
      >
        <label style={{ marginBottom: "10px", fontSize: "20px" }}>
          Enter file name:
          <input
            style={{ marginLeft: "5px", padding: "5px", width: "300px" }}
            type="text"
            name="searchQuery"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>
        <button
          style={{
            marginTop: "10px",
            width: "100px",
            height: "50px",
            borderRadius: "20px",
          }}
          type="submit"
        >
          Search
        </button>
      </form>

      <p style={{ marginTop: "10px", fontSize: "18px" }}>{secondresults}</p>
    </div>
  );
}

export default Prediction;
