import React,{useState,useEffect} from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Label } from 'recharts';
import axios from 'axios';

const data = [
  { name: 'Scanned', value: 400 },
  { name: 'UnScanned', value: 300 },
  { name: 'Reset', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Calculate the total value to display in the center

function C_PieChart() {
   const [data, setData] = useState([]);
   const [totalValue, setTotalValue] = useState(0);
  const [sortedData, setSortedData] = useState([]);

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/groupByScanned`);
      console.log(response.data);
      setData([
        {name:'Scann',value:response.data.totalScanned},
        {name:'UnScann',value:response.data.totalUnscanned},
        {name:'Reset',value:response.data.totalReset},
      ]);
      // if (Array.isArray(response.data) && response.data.length > 0) {
      //   setData(response.data);
      // } else {
      //   console.error("Data is not in the expected format or is empty.");
      //   setData([]);
      // }
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    if (data) {
const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);
      setTotalValue(totalValue);
    }
  },[data])
  return (
    <ResponsiveContainer width="100%" height={500}> {/* Increased height for larger appearance */}
    <h1 style={{fontSize:'1.2rem',marginTop:'0rem',color:'gray'}}>Scan | Unscan | Reset Ratio</h1>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}  // Increased inner radius
          outerRadius={120} // Increased outer radius
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {/* {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))} */}
          <Cell key="totalScanned" fill={COLORS[0]}/>
          <Cell key="totalUnscanned" fill={COLORS[1]}/>
          <Cell key="totalReset" fill={COLORS[2]}/>
          
          <Label
            value={`Records: ${totalValue}`}
            position="center"
            style={{ fontSize: '14px', fill: '#ffff', fontWeight: 'bold' }} // Increased font size for better visibility
          />
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default C_PieChart;
