import { RxCross1 } from "react-icons/rx";
import { MdOutlineSort } from "react-icons/md";
// import sort_icon from "../assets/sort_icon.png";
import "../App.css";
import Chat from "./Chat";
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { API_URL_PROD } from "../utils/utils";




function Navbar() {

  const URL = `${API_URL_PROD}/get_size_chart`;

  const [details, setDetails] = useState('Fetching data...');

  async function callApi(url:string, data:any, method = 'POST', headers = { 'Content-Type': 'application/json' }) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }

  useEffect(() => {
    // Function to fetch data from background script
    const fetchData = () => {
      chrome.runtime.sendMessage({ action: 'fetchData' }, (response) => {
        if (chrome.runtime.lastError) {
          setDetails('Error fetching data.');
        } else {
          chrome.storage.local.set({ ["product"]: response}, function () {
            console.log("Product Data Saved");
          });
          setDetails(JSON.stringify(response, null, 2) || 'No data found.');
          callApi(URL,response).then(res=>console.log("Successfull", res)).catch(err=>console.error("Errored",err));
        }
      });
    };

    // Call fetchData function on component mount
    fetchData();
    console.log(details)
  }, []);

  useEffect(() => {
    console.log("called");
    chrome.storage.local.get(["uuid"], function (result) {
      console.log(result["uuid"]);  
      if(result["uuid"]){
        console.log("uuid is already saved" , result["uuid"]);
      }else{
          var uid :any= uuid().toString();
        console.log("called2");
        chrome.storage.local.set({ ["uuid"]: uid}, function () {
          console.log("uuid saved" + uid);
        });
      }
    });
  
  })

  return (
    <div className="flex flex-row items-center justify-between px-3 py-2 shadow-md">
      {/* <MdOutlineSort height={20} width={20}/> */}
      {/* <img src="./assests/sort_icon.png" alt="sort_icon" className="h-6 w-6"  /> */}
      {/* <h2 className="myFont text-3xl text-primary" style={{ fontWeight: 600 }}>
        1<span className="text-secondary">cl</span>ick!
      </h2> */}
      <div className="logo-text">
        <span className="one" >1</span>
        <span className="click">CLICK</span>
      </div>
      <div onClick={() => window.close()}>
      <img
        src="./assests/close.svg"
        alt="close_icon"
        className="h-6 w-6 cursor-pointer"
      />
      </div>
      
    </div>
  );
}

export default Navbar;
