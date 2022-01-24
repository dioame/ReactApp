import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {Image} from 'cloudinary-react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';


import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@material-ui/core/Box';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    fontFamily: 'verdana'
  },
  imageList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  padding: {
    padding: '10px',
  },
  drawer: {
    width: 300,
    padding: '20px'
  },
  imageContainer: {
    width: 300,
    marginTop: '10px',
    marginBottom: '10px'
  }
}));

export default () => {
  const classes = useStyles();
  
  const [productName,setProductName] = useState('');
  const [productPrice,setProductPrice] = useState('');

  const [productList,setProductList] = useState([]);
  const [fileInputState,setFileInputState] = useState('');
  const [previewSource,setPreviewSource] = useState('');

  const [toggleDrawer, setToggleDrawer] = useState(false);

  const [dataToUpdate, setDataToUpdate] = useState('');

  const [open, setOpen] = useState(false);
  const [isDeleteID, setIsDeleteID] = useState(null);
  const [isUpdateID, setIsUpdateID] = useState(null);

  const [methodName, setMethodName] = useState("Add");
  const [loading, setLoading] = React.useState(false);
  

  const drawerOpen = (status) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setToggleDrawer(!status);
  };

  const HandleInputProductName = (e) => {
    setProductName(e.target.value);
  }
  const HandleInputProductPrice = (e) => {
    setProductPrice(e.target.value);
  }


  const HandleFileInputChange = (e) =>{
    const file =  e.target.files[0];
    PreviewFile(file)
}
const PreviewFile = (file) =>{
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    }
}
const HandleSubmitFile = (e) =>{
    e.preventDefault();
    if(!previewSource) return;
    UploadImage(previewSource);
    
    
}

const UploadImage = async(base64EncodedImage)=>{


  if(isUpdateID){
    try{
      const res = await fetch('/api/products',{
            method: "PUT",
            body: JSON.stringify({id:isUpdateID,img:base64EncodedImage,name:productName,price:productPrice}),
            headers:{'Content-type':'application/json'}
        })
        const data = await res.json();
        console.log(data);
        setToggleDrawer(!toggleDrawer);
        setLoading(false);
    }catch(error){
        console.error(error);
    }

  }else{
    try{
      const res = await fetch('/api/products',{
            method: "POST",
            body: JSON.stringify({img:base64EncodedImage,name:productName,price:productPrice}),
            headers:{'Content-type':'application/json'}
        })
        const data = await res.json();
        console.log(data);
        setProductList([data,...productList]);
        setToggleDrawer(!toggleDrawer);
    }catch(error){
        console.error(error);
    }
  }
   
}


  const getList = async()=>{
    try{
        const res = await fetch('/api/products');
        const data = await res.json();
        setProductList(data);
    }catch(error){
        console.error(error);
    }
  };


  const handleDeleteData = (id) => {
    setOpen(true);
    setIsDeleteID(id);
  }

  const handleInsertData = () => {
    
   
    setToggleDrawer(!toggleDrawer);
    setMethodName("Add");
    setProductName("");
    setProductPrice("");
    setPreviewSource("");
   
  }

  const handleUpdateData = (item) => {
    
    setIsUpdateID(item._id);
    setToggleDrawer(!toggleDrawer);
    setMethodName("Update");
    setProductName(item.name);
    setProductPrice(item.price);
   
  }

  useEffect(()=>{
    getList();
  },[handleDeleteData]);

  const  handleConfirm = async() => {
    setOpen(false);
    try{
      const res = await fetch('/api/products/'+isDeleteID,{method: "DELETE"});
      const data = await res.json();
      console.log(data);
    }catch(error){
        console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>

              <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    onClick={handleInsertData}
                    >
                   Add Product
                </Button>

     

      <ImageList rowHeight={300} className={classes.imageList} cols={4}>
        <ImageListItem key="Subheader" cols={4} style={{ height: 'auto' }}>
          <ListSubheader component="div">List of Items</ListSubheader>
        </ImageListItem>
        {productList.map((item,index) => (
           <Box  key={index}>
          <ImageListItem key={item.img} cols={item.cols || 1} style={{margin: '20px'}}>
            
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button variant="outlined" size="small" onClick={()=>{handleUpdateData(item)}}> <EditIcon /></Button>
              
            </ButtonGroup>

            <Image 
              key={index}
              cloudName="dwpefzbuc"
              publicId={item.img}
              crop="scale"
              width="200"
            />

            <ImageListItemBar
              title={item.name}
              subtitle={<span>Price: {item.price}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${item.name}`} className={classes.icon}>
                    <Button variant="outlined" size="small" onClick={()=>{handleDeleteData(item._id)}}><DeleteIcon /></Button>
                </IconButton>
              }
            />
          </ImageListItem>
         
          </Box>
        ))}
      </ImageList>
      

      <Drawer anchor="left" open={toggleDrawer} onClose={drawerOpen(toggleDrawer)} >
            <div
                className={classes.drawer}
                role="presentation"
            >
                <form onSubmit={HandleSubmitFile}>

                <h2 style={{fontFamily:'verdana'}}>{methodName} Product</h2>

                <TextField id="outlined-basic" label="Product Name" value={productName} variant="outlined" onChange={HandleInputProductName}  style={{marginBottom:'5px'}}/>
                <TextField id="outlined-basic" label="Price" value={productPrice} variant="outlined"  onChange={HandleInputProductPrice} style={{marginBottom:'5px'}}/>

                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    >
                    Select Image From File
                    <input
                        type="file"
                        name="image"
                        onChange={HandleFileInputChange}
                        value={fileInputState}
                        hidden
                    />
                </Button>
                <br/>
                
            <div className={classes.imageContainer}>
            {previewSource && (
                     <img src={previewSource} alt="chosen" style={{height:'300px',maxWidth:'100%'}} /> 
                    
            )}
            </div>

            {previewSource && ( 
                

            <Box sx={{ display: 'flex' }}>
            
            <Button
                            variant="contained"
                            component="label"
                            color="success"
                            >
                          Save
                            <input
                                type="submit"
                                name="submit"
                                hidden
                            />
                          </Button>


                          
            </Box>

              )}
              </form>


            </div>
        </Drawer>


        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="alert-dialog-title">
            {"Deleting Item."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm}>Confirm</Button>
            <Button onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}
