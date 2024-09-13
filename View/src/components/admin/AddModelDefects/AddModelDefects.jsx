import React, { useContext, useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import axios from 'axios';
import { modelContext } from '../Context/Context';

const AddModelDefects = (props) => {
  const [allDefects, setAllDefects] = useState([]);
  const context = useContext(modelContext);

  useEffect(() => {
    axios.get('http://localhost:5555/defects')
      .then((res) => {
        setAllDefects(res.data);
      });
  }, []);

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
                value={defect._id}
                checked={context.model.component[props.index]?.defects?.some(d => d.id === defect._id) || false}
                onChange={handleChange}
              />
            }
            label={defect.name}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default AddModelDefects;
