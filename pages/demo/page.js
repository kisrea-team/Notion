import { getData } from '@/lib/notion/getPostBlocks';
// import { getPageData } from '@/lib/notion/getPageData';
// import { getGlobalNotionData } from '@/lib/notion/getNotionData';
// import { getDatabase } from '@/lib/notion/getDatabase';
// import { getCollectionData } from '@/lib/notion/getCollectionData'; 
// import Image from 'next/image';
import * as React from 'react';
import Time from './time';
// import Page from './demo/page';
// import Shici from './demo/shici';
import { Card, CardMedia, IconButton, CardContent, Typography, Avatar, Box, } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { deepPurple } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';

const style = {
   img: {
      overflow: 'clip',
      overflowClipMargin: 'content-box',
      transform: 'Scale(105%)'
   },
   item: {
      fontSize: '2vh',
      marginRight: '5vh',
      color: '#D6DBDC'
   },
   text: {
      color: 'black',
   },
   box: {
      display: 'grid',
      alignItems: 'center',
      width: '275px',
      height: '35px',
      backgroundColor: 'white',
      borderRadius: '15px',
   }
}
// const jinrishici = require('jinrishici');
// jinrishici.load(shici => {
//    console.log(shici);
// });
const Test = data => {

   return (
      <main className='bg-main'>
         <section>
            {/* 搜索 */}
            <Box sx={style.box} className="grid-cols-2">
               <Typography>搜索...</Typography>
               <SearchIcon color='white' className=' items-end' />
            </Box>
            {/* 介绍 */}
            <Card sx={{ maxWidth: 275, maxHeight: 275, borderRadius: 3.75 }}>
               <CardContent>
                  <div>
                     {/* <Avatar sx={{ bgcolor: deepPurple[100] }} alt={data.data.notice.Person[0].name}></Avatar> */}
                     {/* <Typography>{data.data.notice.Person[0].name}</Typography> */}
                     <Time />
                  </div>
                  {/* <Shici/> */}
                  <Typography variant='h6' component='div' style={style.text}>
                     {data.data.siteInfo.description}
                  </Typography>
               </CardContent>
               <CardContent></CardContent>
            </Card>
         </section>
      </main>

   )
}
/**
 * SSG 获取数据
 * @returns
 */
export async function getStaticProps() {
   const data = await getData()
   if (!data) {
      return {
         notFound: true,
      }
   }
   return {
      props: { data }, // will be passed to the page component as props
   }

}

export default Test