import {useEffect,useRef} from 'react';

export default function GoogleLogin({onSuccess,onError}){
  const buttonRef=useRef(null);
  useEffect(()=>{
    const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if(!clientId){onError('Google login is not configured');return;}
    const render=()=>window.google?.accounts.id.renderButton(buttonRef.current,{theme:'outline',size:'large',width:320,text:'continue_with'});
    if(window.google){window.google.accounts.id.initialize({client_id:clientId,callback:response=>onSuccess(response.credential)});render();return;}
    const script=document.createElement('script');
    script.src='https://accounts.google.com/gsi/client';
    script.async=true;
    script.onload=()=>{window.google.accounts.id.initialize({client_id:clientId,callback:response=>onSuccess(response.credential)});render();};
    script.onerror=()=>onError('Could not load Google login');
    document.head.appendChild(script);
  },[onError,onSuccess]);
  return <div ref={buttonRef} aria-label="Continue with Google"/>;
}
