import {useEffect, useState} from 'react'
import {makeAuthGetReq, makeUnAuthGetReq} from '../utils/serverHelper';

const UserFetchData=(url, requiresAuth=false)=> {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData= async()=>{
            setLoading(true);
            try{
                const token = localStorage.getItem("docToken");
                const response = (requiresAuth && token)
                    ? await makeAuthGetReq(url)
                    : await makeUnAuthGetReq(url);
                if(!response.success){
                    throw new Error(response.message + "😒");
                }
                setData(response.data);
                setLoading(false);
            }
            catch(err) {
                setLoading(false);
                setError(err.message.includes('fetch') ? 'Server is starting up, please wait a moment and refresh...' : err.message);
            }
        };

        fetchData();
    }, [url, requiresAuth]);

  return {
    data, loading, error
  }
}

export default UserFetchData;