import React from "react"

// The header bar at the top of the screen.

function CopyCatHeader() {

    return(
        <div className="TopBar">
            
            <div className="LogoAndHeader">


                <img src={require('./cat.png')} alt="Cat" width="50px" height="70px"></img>
                
                <h1 style={{color:"white"}} className="CopyCatHeader">CopyCat <p style={{fontSize:"20px"}}>A Plagiarism Detector</p></h1>


            </div>
            
            
        </div>
    )
}

export {
    CopyCatHeader
}