import {useEffect, useState} from 'react'
import {makeAuthGetReq} from '../utils/serverHelper';

const UserFetchData=(url)=> {
    // console.log(url)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData= async()=>{
            setLoading(true);

            try{
                const response=await makeAuthGetReq(url);
                if(!response.success){
                    throw new Error(response.message + "😒");
                }
                // console.log(response)
                setData(response.data);
                setLoading(false);
            }
            catch(err) {
                setLoading(false);
                setError(err.message);
            }
        };

        fetchData();
    }, [url]);

    // console.log(data);

  return {
    data, loading, error
  }
}

export default UserFetchData;