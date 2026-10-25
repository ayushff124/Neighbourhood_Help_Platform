const SYSTEM_PROMPT='You are Neighborhood Guide, a concise and friendly assistant for a local community help website. Help users understand how to ask for help, offer help, browse community posts, and use messages. Do not invent platform features. Keep replies practical and under 100 words.';

exports.reply=async(req,res)=>{
  try{
    const {messages=[]}=req.body;
    if(!Array.isArray(messages)||messages.length===0)return res.status(400).json({message:'A message is required'});
    const apiKey=(process.env.OPEN_ROUTER_API_KEY||process.env.OPENROUTER_API_KEY||'').trim().replace(/^['"]|['"]$/g,'');
    if(!apiKey)return res.status(503).json({message:'Chatbot is not configured'});
    const response=await fetch('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json','HTTP-Referer':process.env.CLIENT_URL||'http://localhost:5173','X-Title':'Neighborhood Help'},body:JSON.stringify({model:process.env.OPENROUTER_MODEL||'openai/gpt-4o-mini',messages:[{role:'system',content:SYSTEM_PROMPT},...messages.slice(-12).map(message=>({role:message.role==='assistant'?'assistant':'user',content:String(message.content).slice(0,1000)}))],temperature:.4,max_tokens:180})});
    const data=await response.json();
    if(!response.ok)return res.status(502).json({message:data.error?.message||'AI service request failed'});
    const content=data.choices?.[0]?.message?.content;
    if(!content)return res.status(502).json({message:'AI service returned an empty reply'});
    res.json({reply:content});
  }catch(error){console.error('Chatbot error:',error.message);res.status(500).json({message:'Could not reach the chatbot'});}
};