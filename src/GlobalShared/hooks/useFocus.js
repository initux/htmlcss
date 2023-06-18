import { useRef } from "react";

const useFocus = () => {
    const inputRef = useRef(null)
    const setFocus = () => {inputRef.current &&  inputRef.current.focus()}
  
    return [ inputRef, setFocus ] 
}

export default useFocus;
  