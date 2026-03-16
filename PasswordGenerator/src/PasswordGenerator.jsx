import { useEffect, useRef } from "react";
import "./PasswordGenerator.css";
import { useState, useCallback } from "react";

function PasswordGenerator(){
     
    let [length, setLength] = useState(10);
    let [number, setNumber] = useState(false);
    let [character, setCharacter] = useState(false);
    let [password, setPassword] = useState("");


    let passwordRef = useRef(null)

    let PasswordGenerator = useCallback( () => {
        
        let pass = "";         
        let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz"
        if(number) string = string + "0123456789"
        if(character) string = string + "!@#$%^&*()"

        for (let i = 1; i <= length; i++) {
            let Indexes = Math.floor(Math.random() * string.length + 1)
            console.log(Indexes);

            pass = pass + string.charAt(Indexes)    
             
            
        }

            setPassword(pass);
         

    }, [length, number, character, setPassword]
        
    )

    
    let copyToClipboard = useCallback(() => {
        passwordRef.current?.select()
        window.navigator.clipboard.writeText(password)
    }, [password])


    useEffect( () => {
        PasswordGenerator();
    }, [length, number, character, PasswordGenerator] ) 


    return(
        <>
        <input 
        type="text"
        value={password}
        name="input"
        readOnly
        ref={passwordRef}
        onChange={(event) => {setPassword(event.target.value)}} />
        <button onClick={copyToClipboard}>copy</button>
        <input 
        type="range"
        min={10}
        max={20}
        value={length}
        id="range"
        onChange={(event) => {setLength(event.target.value)}}
         />
        <label htmlFor="range">Length: {length}</label>
        <input 
        type="checkbox"
        defaultChecked={number}
        id="num"
        onChange={() => {setNumber((prev) => !prev )}} />
        <label htmlFor="num"></label>
        <input 
        type="checkbox"
        defaultChecked={character}
        id="char"
        onChange={() => {setCharacter((prev) => !prev )}} />
        <label htmlFor="char"></label>
        </>    
    )
}



export default PasswordGenerator;