const {chromium}=require('playwright');
const S='/tmp/claude-1001/-work/4f5d93d6-4a70-40f6-abdd-dc1c8cdb355f/scratchpad';
(async()=>{const b=await chromium.launch({args:['--no-sandbox'],executablePath:process.env.CHROME_PATH});
for(const w of [1280,390]){
  const p=await b.newPage({viewport:{width:w,height:900}});
  await p.goto('file:///work/site/index.html',{waitUntil:'networkidle'});
  await p.waitForTimeout(400);
  const boxes=await p.evaluate(()=>{
    const r=e=>{const b=e.getBoundingClientRect();return {x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.width),h:Math.round(b.height)};};
    const k=document.querySelector('.hero .kicker'), l=document.querySelector('.hero__line');
    const out={kicker:k?r(k):null,line:r(l)};
    document.querySelector('.hero__inner').style.visibility='hidden';
    return out;});
  await p.screenshot({path:S+'/hero-bg-'+w+'.png'});
  console.log(w+' '+JSON.stringify(boxes));
  await p.close();
}
await b.close();})()
