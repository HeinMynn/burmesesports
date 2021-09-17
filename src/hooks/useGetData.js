import React, { useEffect, useState } from "react";
import db from '../firebase.config';

export const useGetData = () => {
    const [documents, setDocuments] = useState([])
    const fetchMatches=async()=>{
        const response=db.collection('matches');
        const data=await response.get();
        data.docs.forEach(item=>{
            setDocuments([...documents,item.data()])
           })
    }
    useEffect(() => {
        fetchMatches();
        console.log(documents)
    }, []);
    return [documents];
    };