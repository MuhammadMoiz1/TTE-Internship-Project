import React, { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import axios from 'axios';
import { modelContext } from '../Context/Context';

const AddModelDefects = (props) => {
  const [allDefects, setAllDefects] = useState([]);
  const context = useContext(modelContext);
  const [render,setRender]=useState(0);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/defects`)
      .then((res) => {
        setAllDefects(res.data);
      });
  }, []);

  const clearSelection=()=>{
    context.model.component[props.index].defects=[];
    setRender(prev=>prev+1);
  }

  const handleChange = (event) => {
    const defectId = event.target.value;
    const defect = allDefects.find(d => d._id === defectId);

    // Update the selectedDefects with the new defect or remove if already selected
    let updatedDefects;
    context.setModel(prevContext => {
      const data = { ...prevContext };
      const componentDefects = data.component[props.index].defects || [];

      // Check if the defect is already selected
      const isSelected = componentDefects.some(d => d.id === defectId);

      if (isSelected) {
        // Remove the defect from the selection
        updatedDefects = componentDefects.filter(d => d.id !== defectId);
      } else {
        // Add the defect to the selection
        updatedDefects = [...componentDefects, { id: defect._id, name: defect.name, image: defect.image }];
      }

      // Update the defects in the component at the given index
      data.component[props.index].defects = updatedDefects;

      // Return updated context data
      return data;
    });
    console.log(context.model.component[props.index].defects )
  };

  return (
    <div>
      <Typography variant="h6">Select Defects</Typography>
      <FormGroup>
        {allDefects.map(defect => (
          <FormControlLabel
            key={defect._id}
            control={
              <Checkbox
               key={`check-${render}`}
                value={defect._id}
                checked={context.model.component[props.index]?.defects?.some(d => d.id === defect._id) || false}
                onChange={handleChange}
              />
            }
            label={defect.name}
          />
        ))}
      </FormGroup>
      <Button onClick={clearSelection}>Clear Selection</Button>
    </div>
  );
};

export default AddModelDefects;
