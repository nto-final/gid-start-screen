import React from "react";
import "./index.css"

interface DefaulButtonIE{
    onClick:() => void;
    type?: "button" | "submit" | "reset" | undefined;
    style?: React.CSSProperties | undefined
}

export const DefaulButton:React.FC<DefaulButtonIE> = (props) =>{
    return(
        <button className="defaultBtn" style={props.style} type={props.type} onClick={()=>props.onClick()}>{props.children}</button>
    )
}