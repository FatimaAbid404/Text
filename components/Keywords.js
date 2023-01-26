import React, { useContext, useEffect } from 'react'
import KeywordContext from '../context/Keywords/KeywordContext';
import Addvideo from './Addvideo';
import Keyworditem from './Keyworditem';


const Keywords = () => {
  const context = useContext(KeywordContext);
  const { Keywords, getKeyword } = context;
  useEffect(()=>{
    getKeyword()
  },[])
  return (
    <>
     <Addvideo/>
    <div className="row my-3">
      <h1>your Text</h1>
      {Keywords.map((Keyword) => {
        return <Keyworditem key={Keyword._id} Keyword={Keyword}/>;
      })}
    </div>
    </>
  )
}

export default Keywords
