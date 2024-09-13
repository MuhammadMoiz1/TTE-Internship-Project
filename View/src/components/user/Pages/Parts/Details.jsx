import { Typography } from '@mui/material';
import React from 'react';
import ReactImageMagnify from 'react-image-magnify';

const Details = (props) => {
  return (
    <div 
      key={props.key} 
      style={{
        display: 'flex',
        width: '100%',
        height: 'auto', // Allow height to adjust based on content
        justifyContent: 'space-between',
        backgroundColor: '#eceff1',
        padding: '10px',
        borderRadius:'10px',
        marginBottom:'20px',
        
        boxSizing: 'border-box' // Ensure padding is included in width/height calculations
      }}
    >
      <div style={{ width: '65%' }}>
        <Typography 
          variant="h6" 
          style={{
            fontWeight: 'bold',
            wordBreak: 'break-word' // Allow text to break and wrap
          }}
        >
          {props.data.Description}
        </Typography>
        <Typography 
          variant="body1" 
          style={{
            margin: '4px 0',
            wordBreak: 'break-word' // Allow text to break and wrap
          }}
        >
          <strong>Part Code:</strong> {props.data.Code}
        </Typography>
        <Typography 
          variant="body1" 
          style={{
            margin: '4px 0',
            wordBreak: 'break-word' // Allow text to break and wrap
          }}
        >
          <strong>Process:</strong> {props.data.Process}
        </Typography>
        <Typography 
          variant="body1" 
          style={{
            margin: '4px 0',
            wordBreak: 'break-word' // Allow text to break and wrap
          }}
        >

          <strong>Consumption:</strong> {props.data.Consumption}
        </Typography>
        <Typography 
          variant="body1" 
          style={{
            margin: '4px 0',
            wordBreak: 'break-word' // Allow text to break and wrap
          }}
        >
          <strong>Item Type:</strong> {props.data['Item Type']}
        </Typography>
        {props.data.Color&&(<Typography 
          variant="body1" 
          style={{
            margin: '4px 0',
            wordBreak: 'break-word' // Allow text to break and wrap
          }}
        >
          <strong>Color:</strong> {props.data.Color}
        </Typography>)}
        {props.data.Class&&(<Typography 
          variant="body1" 
          style={{
            margin: '4px 0',
            wordBreak: 'break-word' // Allow text to break and wrap
          }}
        >
          <strong>Class:</strong> {props.data.Class}
        </Typography>)}
        {props.data.addInfo&&(<Typography 
          variant="body1" 
          style={{
            margin: '4px 0',
            wordBreak: 'break-word' // Allow text to break and wrap
          }}
        >
          <strong>Additional Information:</strong><br /> {props.data.addInfo}
        </Typography>)}
      </div>
      <div 
        style={{
          width: '35%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden' // Ensure content does not overflow
        }}
      >
        <ReactImageMagnify 
          style={{ objectFit: "contain", maxHeight: '100%', maxWidth: '100%' }} 
          {...{
            smallImage: {
              alt: 'Wristwatch by Ted Baker London',
              isFluidWidth: true,
              src: `${import.meta.env.VITE_API_URL}${props.data.image}`,
              
            },
            largeImage: {
              src: `${import.meta.env.VITE_API_URL}${props.data.image}`,
              width: 400,
              height: 500,
            },
            enlargedImagePosition: 'over',
            enlargedImageContainerDimensions: {
              width: "100% !important",
              height: "100% !important",
            },
          }} 
        />
      </div>
    </div>
  );
}

export default Details;
