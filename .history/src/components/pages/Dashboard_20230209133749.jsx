/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { useNavigate } from "react-router-dom";
import { ImUsers } from "react-icons/im";
import img from "../SVG/home.svg";
import img4 from "../SVG/tag.svg";
import axios from "axios";

export const dash = (data) => {
  return data;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [ url , setUrl ] = useState("today")
  const [data  , setData] = useState([])

  const filterData = async () => {
    try{
      const {data } = await axios.get(`http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/getMonthwise/${url}`)
      setData(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    filterData()
  },[url])

  const card = [
    // {
    //    title: "Total Installations",
    //   number: "100",
    //   icon: <i className="fa-solid fa-gear text-2xl text-[#ff5370]"></i>,
    //   bg: "#ff5370",
    // },
    {
      title: "Total User's",
      number: data?.data?.user,
      icon: <i className="fa-solid fa-user text-2xl text-[#4099ff]"></i>,
      link: "/customer",
      bg: "#4099ff",
    },
    {
      title: "Total Hero's",
      number: data?.data?.hero,
      icon: <ImUsers className="text-2xl text-[#2ed8b6]" />,
      link: "/generateId",
      bg: "#2ed8b6",
    },
    {
      progress: "bg-yellow-400",
      title: "Total Project's",
      number: data?.data?.booking,
      img: `${img4}`,
      link: "/Notice/Labour",
      bg: "#ffb64d",
    },
    // {
    //   progress: "bg-yellow-400",
    //   title: "Total Revenue",
    //   number: "150",
    //   icon: <i className="fa-solid fa-money-bill text-2xl text-[#aa5de1]"></i>,
    //   bg: "#aa5de1",
    // },
  ];

  function AgainFetch (data) {
    setUrl(data)
    filterData()
  }


  return (
    <>
      <div style={{ display: "flex", gap: "20px", marginBottom: "2%" }}>
        <img
          src={img}
          alt=""
          style={{
            backgroundColor: "#4099ff",
            padding: "8px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        />
        <p style={{ color: "black", fontSize: "18px", margin: "0" }}>
          Dashboard
        </p>
      </div>

      <div className="dropdown">
        <p className="upper" onClick={() => AgainFetch("today")}>Today Summary</p>
        <div className="dropdown-content">
          <p onClick={() => AgainFetch("weekly")}> Weakly</p>
          <p onClick={() => AgainFetch("monthly")}> Monthly</p>
          <p onClick={() => AgainFetch("monthly")}> Yearly</p>
        </div>
      </div>

      <section className="grid md:grid-cols-4 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md"
              key={index}
              onClick={() => navigate(`${card.link ? card.link : "#"}`)}
              style={{ cursor: "pointer", backgroundColor: `${card.bg}` }}
            >
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span
                    className="tracking-widest text-gray-900"
                    style={{ color: "white" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                    style={{ color: "white" }}
                  >
                    {card.number}
                  </span>
                </div>
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center myICons">
                  {card.img ? <img src={card.img} alt="" /> : card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Dashboard);
