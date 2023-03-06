/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Chart from "react-apexcharts";
import axios from "axios";


const Graph = () => {
  const [ data , setData ] = useState([])

  const fetchData = async () => {
    try{
      const { data } = await axios.get("http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/revenue/countOfMaleAndFemale")
      setData(data)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  return (
    <section>
      <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
        <span className="tracking-widest text-slate-900 font-semibold uppercase ">
          Analatics Graph
        </span>
      </div>
      <div style={{ marginTop: "2%" }}>
      

        <Chart
          type="bar"
          width={1300}
          height={700}
          series={[
            {
              name: "Male",
              data: [ data?.male , 0 ],
            },
            {
              name: "Female",
              data: [200 , 0],
            },
            {
              name: "Common",
              data: [100 , 0],
            },
            
          ]}
         style={{
            color : 'blue'
         }}
          options={{}}
          xaxis ={{
            categories : ['Jan' , 'fev']
          }}
        ></Chart>
      </div>
    </section>
  );
};

export default HOC(Graph);
