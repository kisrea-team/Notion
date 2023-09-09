import { getData } from '@/lib/notion/getPostBlocks';
// import { getPageData } from '@/lib/notion/getPageData';
// import { getGlobalNotionData } from '@/lib/notion/getNotionData';
// import { getDatabase } from '@/lib/notion/getDatabase';
// import { getCollectionData } from '@/lib/notion/getCollectionData'; 
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
// import { list } from 'postcss';
// @param {*} props
// @returns
import { Button, Card, CardMedia, IconButton, CardContent, Typography, Avatar } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { productionBrowserSourceMaps } from '@/next.config';
const style = {
   img: {
      overflow: 'clip',
      overflowClipMargin: 'content-box',
      transform: 'Scale(105%)'
   },
   item: {
      fontSize: '4vh',
      marginRight: '5vh',
   }
}
const Test = data => {
   const listItems = data.data.posts.map(product =>
      // eslint-disable-next-line react/jsx-key
      <section>
         <div className='container mx-auto flex m-10'>
            <Card sx={{ borderRadius: 2, }} className=' gard-width gard-display flex' raised='true' >
               <div className='flex image-container items-center card-img'>
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
                  <Typography variant="body2" color="text.secondary">
                     {product.summary}
                  </Typography>
               </CardContent>
            </Card>
         </div>
      </section>
   );
   console.log(data)
   return (
      <main className=''>

         <div className="flex h-16 bg-red-200 flex-wrap content-center md:box-content">
            <span className="2xl:text-2xl sm:text-xl font-semibold text-justify ml-10">{data.data.siteInfo.title}</span>
            <div className=' flex text-justify mr-10'>
               <p style={style.item}>最新文章</p>
               <p style={style.item}>关于</p>
            </div>
            <IconButton aria-label='Brightness4'><Brightness4Icon /></IconButton>
            <Avatar></Avatar>
         </div>

         <section>

         </section>
         <section>
            {listItems}
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
