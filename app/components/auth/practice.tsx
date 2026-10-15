import { useState } from 'react';
import {clearInterval} from "node:timers";

export function handleDisabledSubmit (){
    const [ disabled, setDisabled] = useState(false);
    if(phoneNumber.length < 10){
        setDisabled(true);
    }
 return () => {
        handleDisabledSubmit();
    };
}

export function handleSetInterValOtp (){
    const [ countDown, setCountDown ] = useState(60);

    if(countDown > 0) {
        const timer = setInterval(() => {
            console.log('1 second passed!')
        }, 1000);
    }
    clearInterval(() => {

    })
    return countDown;
}