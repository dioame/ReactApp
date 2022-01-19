import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    padding: {
      padding: '10px',
    },
}));

export default () => {
    const classes = useStyles();

    const [fileInputState,setFileInputState] = useState('');
    const [previewSource,setPreviewSource] = useState('');

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
        try{
            await fetch('/api/products',{
                method: "POST",
                body: JSON.stringify({img:base64EncodedImage,name:'sample',price:45.6}),
                headers:{'Content-type':'application/json'}
            })
        }catch(error){
            console.error(error);
        }
    }

    return (
        <div className={classes.padding}>
            <form onSubmit={HandleSubmitFile}>
                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    >
                    Upload Product
                    <input
                        type="file"
                        name="image"
                        onChange={HandleFileInputChange}
                        value={fileInputState}
                        hidden
                    />
                </Button>
                
                 <Button
                    variant="contained"
                    component="label"
                    >
                    Submit
                    <input
                        type="submit"
                        name="submit"
                        hidden
                    />
                 </Button>
                 
            </form>
            {previewSource && (
                     <img src={previewSource} alt="chosen" style={{height:'300px'}} /> 
            )}
        </div>
    )
}

