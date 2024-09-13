import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import DefectCard from '../../DefectCard/DefectCard';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';

const Defects = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [total,setTotal]=useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/defects`)
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
        const total = res.data.reduce((acc, defect) => acc + (defect.quantity || 0), 0);
        setTotal(total);
      });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredData(
        data.filter((defect) =>
          defect.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{minHeight:'80vh'}}>
      <div style={{ marginTop: '20px' }}>
        <TextField
          label="Search Defects"
          variant="outlined"
          size='small'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "#2E3D49" }} />
      </IconButton>
      </div>
      <Grid
        container
        spacing={3}
        style={{ marginTop: '20px', height: 'auto', width: '100%', marginBottom: '10px' }}
        justifyContent='space-evenly'
      >
        {filteredData.map((defect) => (
          <DefectCard
            key={defect._id}
            img={defect.image}
            DefectName={defect.name}
            id={defect._id}
            total={total}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Defects;
