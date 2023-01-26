import React,{useState} from 'react'

export default function About(props) {
    // const [mystyle,setmyStyle]=useState({
    //     color:'black',
    //     backgroundColor:'white'
        
    // })
    let mystyle={
      color:props.mode==='dark'?'white':'#042743',
      backgroundColor:props.mode==='dark'?'rgb(36 74 104)':'white',
      // border:'2px solid',
      // borderColor:props.mode==='dark'?'white':'#042743'

    }
    // const[tntext,setbtnstate]=useState("Enable Light mode")
    {/*const toggelstyle=() =>{
        if(mystyle.color ==='white'){
            setmyStyle({
                color:'black',
                backgroundColor:'white'

            }

            )
            setbtnstate("Enable dark Mode")
        }
        else{
          setmyStyle({
            color:'white',
            backgroundColor:'black',
            border :'2px solid white'

        }

        )
        setbtnstate("Enable light Mode")

        }
    }*/}
   
  return (
    <div className="container" style={{color:props.mode==='dark'?'white':'#042743'}}>
        <h1 className="my-3">About Us</h1>
      <div className="accordion" id="accordionExample" style={mystyle}>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button" style={mystyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <strong>Email</strong>
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body" style={mystyle}>
        <strong>abidfatima250@gmail.com</strong> 
      </div>
    </div>
  </div>
 
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed" style={mystyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        <strong>about app</strong>
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" style={mystyle} aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body" style={mystyle}>
        <strong>App is used to store necessary notes in database(mongodb). User can retrieve the data and manipulate it too</strong>
      </div>
    </div>
  </div>
</div>
<div className="container my-3">
{/*<button onClick={toggelstyle} type="button" className="btn btn-primary">{tntext}</button>*/}
</div>
    </div>
  )
}
