import react, { useState } from "react";
import KeywordContext from "./KeywordContext";
const KeywordState = (props) => {
  const host="http://localhost:5000"
  const Keywords_initial = []  
  const [Keywords, setKeywords] = useState(Keywords_initial)
  //get
  const getKeyword =async () => {
    const response = await fetch(`${host}/api/keywords/fetchallkeywords`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    
      headers: {
        'Content-Type': 'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMzY2MTAwZDQyODViMDY5ZTIyZmM0In0sImlhdCI6MTY1NDk0MDM0M30.XAyaPhy7rjH2EgB1vW_a8noySm20yDSTGto4E9pjQNQ"
      },
     
    });
   const json=await response.json()
   console.log(json)
   setKeywords(json)

  }
  //Add 
  const addKeyword =async (title, description, tag,videos) => {
    const response = await fetch(`${host}/api/keywords/addkeywords`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    
      headers: {
        'Content-Type': 'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMzY2MTAwZDQyODViMDY5ZTIyZmM0In0sImlhdCI6MTY1NDk0MDM0M30.XAyaPhy7rjH2EgB1vW_a8noySm20yDSTGto4E9pjQNQ"
      },
     
      body: JSON.stringify({title,description, tag}) // body data type must match "Content-Type" header
    });
    console.log("Adding a new video")
    const key = {
      "_id": "62a45b057f3a64032af43056",
      "user": "62a366100d4285b069e22fc4",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-06-11T09:06:13.408Z",
      "__v": 0
    };
    setKeywords(Keywords.concat(key))

  }
  //edit
  const editKeyword = async(id, title, description, tag) => {
    const response = await fetch(`${host}api/keywords/updatekeyword/${id}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    
      headers: {
        'Content-Type': 'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMzY2MTAwZDQyODViMDY5ZTIyZmM0In0sImlhdCI6MTY1NDk0MDM0M30.XAyaPhy7rjH2EgB1vW_a8noySm20yDSTGto4E9pjQNQ"
      },
     
      body: JSON.stringify({title,description, tag}) // body data type must match "Content-Type" header
    });
    const json= response.json(); // parses JSON response into native JavaScript objects
  
    for (let i = 0; i<Keywords.length; i++) {
      const element = Keywords[i];
      if(element.id===id){
        element.title=title;
        element.description=description;
        element.tag=tag;
      }

    }
  
}

return (
  <KeywordContext.Provider value={{ Keywords, addKeyword,editKeyword,getKeyword }}>
    {props.children}
  </KeywordContext.Provider>
)
}
export default KeywordState;