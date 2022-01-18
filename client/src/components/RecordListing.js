import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {setRecords} from '../redux/actions/recordActions';

const RecordListing = () => {
    const records = useSelector((state) => state.allRecords.records)
    const dispatch = useDispatch()

    const columns = [
        { field: '_id', headerName: 'ID', width: 160 },
        { field: 'name', headerName: 'Name', width: 160 },
        { field: 'category', headerName: 'Category', width: 160 },
      ];
   
    useEffect(()=>{
        const fetchRecords = async() => {
            const response = await axios
            .get("api/items")
            .catch((err)=>{
                console.log("Err: ",err);
            });
            
            dispatch(setRecords(response.data));
        }

        fetchRecords();
    },[])
 
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            getRowId={(records) => records._id}
            rows={records}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
    </div>
    )
}

export default RecordListing
