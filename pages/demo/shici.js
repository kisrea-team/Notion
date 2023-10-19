import React, { useState, useEffect } from 'react';
import jinrishici from 'jinrishici';
function TodayPoem() {
   const [poem, setPoem] = useState('');
 
   useEffect(() => {
     // 使用jinrishici库来获取今日诗词数据
     jinrishici.load((result) => {
       if (result.status === 'success') {
         setPoem(result.data.content);
       } else {
         console.error('Failed to load poem data');
       }
     });
   }, []);
 
   return (
     <div>
       <h1>今日诗词</h1>
       <p>{poem}</p>
     </div>
   );
 }
 
 export default TodayPoem;
 