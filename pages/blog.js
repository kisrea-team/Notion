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
import { Button, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
const style = {
   img: {
      overflow: 'clip',
      overflowClipMargin: 'content-box',
      transform: 'Scale(105%)'
   }
}
// const abc = data.data.posts[0].date.start_date
// const editedDate = new Date(abc);
// const currentDate = new Date();
// const timeDifference = currentDate - editedDate;
// const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
// console.log(`距离最后编辑时间已经过去了 ${daysDifference} 天`);
// console.log(abc)
const Test = data => {
   console.log(data)
   return (
      <main className=''>
         <div className="flex h-16 bg-red-200 flex-wrap content-center md:box-content">
            <h1 className="2xl:text-xl sm:text-sm font-semibold text-justify ml-10">{data.data.siteInfo.title}</h1>
            <IconButton aria-label='Brightness4'><Brightness4Icon /></IconButton>
         </div>
         <section>
            <div className='container mx-auto flex'>
               {/* ---------------------- */}
               <div className=' flex border-2 border-solid'>
                  <div className='flex image-container items-center w-350 h-200'>
                     <Image
                        style={style.img}
                        className='static blur-1'
                        src={data.data.posts[0].pageCover}
                        alt="noticePageCover"
                        width={400}
                        height={300}
                     />
                  </div>
                  <span></span>
                  <div>
                     <div><h1 className='font-size1'>{data.data.posts[0].title}</h1></div>
                     <div><p className='size-vh-100'>{data.data.posts[0].lastEditedTime}天前</p>
                        <p className='md:text-2xl xl:text-lg text-gray-700'>{data.data.posts[0].summary}</p></div>
                  </div>
               </div>
               <div className=' flex border-2 border-solid'>
                  <div className='flex image-container items-center w-350 h-200'>
                     <Image
                        style={style.img}
                        className='static blur-1'
                        src={data.data.posts[1].pageCover}
                        alt="noticePageCover"
                        width={400}
                        height={300}
                     />
                  </div>
                  <span></span>
                  <div>
                     <div><h1 className='font-size1'>{data.data.posts[1].title}</h1></div>
                     <div><p className='size-vh-100'>{data.data.posts[1].lastEditedTime}天前</p>
                        <p className='md:text-2xl xl:text-lg text-gray-700'>{data.data.posts[1].summary}</p></div>
                  </div>
               </div>
            </div>

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
