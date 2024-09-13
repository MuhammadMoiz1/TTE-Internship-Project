import React, { useEffect,useState} from 'react'
import './ModelSlider.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Slide from '@mui/material/Slide';
import Parts from '../Pages/Parts/Parts';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function ModelSlider() {

    const [classing, setClassing] = useState('');
    const [count, setcount] = useState(0);
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
  
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/models`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

    useEffect(()=>{            
        if (count == data.length) {
            setcount(0);
        }
        setClassing('animate__animated animate__fadeInRight');
    },[count])

    useEffect(()=>{
        setTimeout(() => {
            setClassing('');
        }, 1500);
    },[classing])

    useEffect(()=>{
        let slider = setInterval(() => {
            setcount((prev) => prev+1)
           }, 6000);
            return () => clearInterval(slider)
    },[])


  return (
    <div  className='main-div'>
        <h1 style={{marginBottom:'5px'}}>{data[count]?.factName}</h1>
        <div className='arrowLeft' onClick={()=>{
           const c=count-1;
           (c>=0) ?setcount(c):setcount(data.length-1);
           console.log(count);
        }}>
        <ArrowBackIosIcon />
        </div>
        <div className='arrowRight' onClick={()=>setcount((count+1)%data.length)}>
        <ArrowForwardIosIcon />
        </div>
       <div className={classing} style={{height:'75vh',width:'70vw',overflow:'hidden'}}>
       <img src={`${import.meta.env.VITE_API_URL}${data[count]?.image}`} alt="" style={{width:'100%',height:'100%',objectFit:'scale-down'}}/>
       </div>
       <div>
       <Button className='customFont' variant='contained'
       onClick={()=>{handleClick()}}
       >Details</Button>
       <Button className='customFont' variant='contained'
       onClick={()=>{navigate('/models')}}
       >Explore All</Button>
       </div>
<Dialog
  fullScreen
  open={open}
  onClose={handleClose}
  TransitionComponent={Transition}
>
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
      >
        <ArrowBackIcon />
      </IconButton>
    </Toolbar>
    <Parts index={data[count]?._id}/>
   </Dialog>
    </div>
  )
}

export default ModelSlider;