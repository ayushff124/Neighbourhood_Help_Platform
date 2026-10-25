import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Bot, MessageCircle, Send, X} from 'lucide-react';
import './Chatbot.css';
import api from '../services/api';

const quickPrompts=['How do I ask for help?','How can I offer help?','Where are my messages?'];

export default function Chatbot(){
  const {pathname}=useLocation();
  const [open,setOpen]=useState(false);
  const [text,setText]=useState('');
  const [sending,setSending]=useState(false);
  const [messages,setMessages]=useState([{from:'bot',text:'Hi! I’m your Neighborhood Guide. What would you like to do?'}]);
  const send=async(value=text)=>{
    const trimmed=value.trim();
    if(!trimmed||sending)return;
    const next=[...messages,{from:'user',text:trimmed}];
    setMessages(next);
    setText('');
    setSending(true);
    try{const response=await api.post('/chatbot',{messages:next.map(message=>({role:message.from==='bot'?'assistant':'user',content:message.text}))});setMessages(current=>[...current,{from:'bot',text:response.data.reply}]);}catch(error){setMessages(current=>[...current,{from:'bot',text:error.response?.data?.message||'Sorry, chatbot is temporarily unavailable.'}]);}finally{setSending(false);}
  };
  if(['/login','/register','/verify-otp'].includes(pathname))return null;
  return <div className={`chatbot ${open?'is-open':''}`}>
    {open&&<section className="chatbot-panel" aria-label="Neighborhood Guide chatbot">
      <header className="chatbot-header"><div className="chatbot-title"><span className="chatbot-avatar"><Bot/></span><span><b>Neighborhood Guide</b><small>Here to help</small></span></div><button className="chatbot-close" onClick={()=>setOpen(false)} aria-label="Close chatbot"><X/></button></header>
      <div className="chatbot-messages">{messages.map((message,index)=><div className={`chat-message ${message.from}`} key={`${message.from}-${index}`}>{message.text}</div>)}{sending&&<div className="chat-message bot">Thinking...</div>}</div>
      <div className="chatbot-prompts">{quickPrompts.map(prompt=><button key={prompt} onClick={()=>send(prompt)}>{prompt}</button>)}</div>
      <form className="chatbot-form" onSubmit={event=>{event.preventDefault();send()}}><input value={text} onChange={event=>setText(event.target.value)} placeholder="Type a question..." aria-label="Chat message"/><button type="submit" aria-label="Send message"><Send/></button></form>
    </section>}
    {!open&&<button className="chatbot-launcher compact" onClick={()=>setOpen(true)} aria-label="Open Neighborhood Guide"><MessageCircle/><span>Need a hand?</span></button>}
  </div>;
}