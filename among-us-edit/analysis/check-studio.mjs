import {openBrowser} from '@remotion/renderer';
import {writeFileSync} from 'node:fs';
const browser=await openBrowser('chrome');
try {
 const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
 await page.goto({url:'http://localhost:3000/AmongUs-Highlight',timeout:30000});
 const state=await page.evaluate(async()=>{
  const until=Date.now()+15000;
  while(Date.now()<until && !document.querySelector('canvas')) await new Promise(r=>setTimeout(r,200));
  return {title:document.title,text:document.body.innerText.slice(0,1600),canvases:[...document.querySelectorAll('canvas')].map(c=>({width:c.width,height:c.height})),videos:[...document.querySelectorAll('video')].map(v=>({readyState:v.readyState,error:v.error?.message??null}))};
 });
 console.log(JSON.stringify(state));
 const {data}=await page._client().send('Page.captureScreenshot',{format:'png'});
 writeFileSync('out/studio-preview.png',Buffer.from(data,'base64'));
} finally {await browser.close({silent:true});}
