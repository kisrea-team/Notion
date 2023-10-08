import { getData } from '@/lib/notion/getPostBlocks';
// import { getPageData } from '@/lib/notion/getPageData';
// import { getGlobalNotionData } from '@/lib/notion/getNotionData';
// import { getDatabase } from '@/lib/notion/getDatabase';
// import { getCollectionData } from '@/lib/notion/getCollectionData'; 
// import Image from 'next/image';
import * as React from 'react';
import Time from './time';
// import { useState } from 'react';
// import { jinrishici } from 'jinrishici-promise-ts';
// import { list } from 'postcss';
// @param {*} props
// @returns
import { Button, Card, CardMedia, IconButton, CardContent, Typography, Avatar, colors } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { deepClone } from '@/lib/utils';
import { deepOrange, deepPurple } from '@mui/material/colors';
// import { Time } from 'pages/time';
// import { productionBrowserSourceMaps } from '@/next.config';
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
   }
}
// const jinrishici = require('jinrishici');
// jinrishici.load(shici => {
//    console.log(shici);
// });
const Test = data => {
   const listItems = data.data.posts.map(product =>
      // eslint-disable-next-line react/jsx-key
      <section>
         <div className='container mx-auto flex'>
            <a href={product.id}>
               <Card sx={{ borderRadius: 2, }} className=' card-width card-height card-display flex' >
                  <div className='flex image-container items-center card-img '>
                     <CardMedia
                        className='static blur-1 '
                        component="img"
                        alt="green iguana"
                        height="160"
                        src={product.pageCover} />
                  </div>
                  <CardContent className='card-text'>
                     <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                     </Typography>
                     <Typography>{product.lastEditedTime}天前</Typography>
                     {/* <Typography variant="body2" color="text.secondary" className='overflow-hidden text-clip'>
                        {product.summary}
                     </Typography> */}
                     <p className='text-clip'>{product.summary}</p>
                  </CardContent>
               </Card>
            </a>
         </div>
      </section>
   );
   console.log(data)
   return (
      <main className='bg-main'>

         <div className="flex h-16 bg-red-200 flex-wrap content-center md:box-content">
            <span className="2xl:text-2xl sm:text-xl font-semibold text-justify ml-10">{data.data.siteInfo.title}</span>
            <div className=' flex text-justify mr-10'>
               <p style={style.item}>最新文章</p>
               <p style={style.item}>关于</p>
            </div>
            <IconButton aria-label='Brightness4'><Brightness4Icon /></IconButton>
            <Avatar>Z</Avatar>
         </div>
         <div>
            <h1>精选文章</h1>

         </div>
         <div>
            <h1 className=" text_vw_30 sm:text-5xl overflow-hidden text-clip font-medium">{data.data.siteInfo.description}</h1>
            <p className="flex justify-end flex-wrap pt-6 text_vw_15 text-left font-semibold">@{data.data.notice.Person[0].name} </p>
         </div>
         <Card sx={{ maxWidth: 275 }}>
            <CardContent>
               <div><Avatar sx={{ bgcolor: deepPurple[100] }} alt={data.data.notice.Person[0].name}></Avatar>
                  <Typography>{data.data.notice.Person[0].name}</Typography>
                  <Time /></div>

               <Typography variant='h6' component='div' style={style.text}>
                  {data.data.siteInfo.description}
               </Typography>
            </CardContent>
            <CardContent></CardContent>
         </Card>

         <div className='list space-y-[20px]'>
            {listItems}
         </div>
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