import React, { useContext,useState } from 'react'
import KeywordContext from '../context/Keywords/KeywordContext';

const Addvideo = () => {
    const context = useContext(KeywordContext);
    const {addKeyword } = context;
    const [keyword,setkeyword]=useState({title:"",description:"",tag:"default",videos:""})
    const onChange=(e)=>{
        setkeyword({...keyword,[e.target.name]:e.target.value})

    }
    const handleClick=(e)=>{
        e.preventDefault();
        addKeyword(keyword.title,keyword.description,keyword.tag,keyword.videos);

    }
    return (
        <div className="/container my-3">
            <h1> Add a Text</h1>
            <form className="my-3">
                <div className="form-group">
                    <label htmlFor="title">title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="desc" name="description" placeholder="text" onChange={onChange}/>
                </div>
                
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>

    )
}

export default Addvideo
