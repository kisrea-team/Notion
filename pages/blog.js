import { getData } from '@/lib/notion/getPostBlocks';
// import { getPageData } from '@/lib/notion/getPageData';
// import { getGlobalNotionData } from '@/lib/notion/getNotionData';
// import { getDatabase } from '@/lib/notion/getDatabase';
// import { getCollectionData } from '@/lib/notion/getCollectionData'; 
import Image from 'next/image';
import { useState } from 'react';
// import { list } from 'postcss';
// @param {*} props
// @returns
const style = {
    img: {
        overflow: 'clip',
        overflowClipMargin: 'content-box',
        transform: 'Scale(105%)'
    }
}
const Test = data => {
    console.log(data)
    return (
        <main className=''>
            <div className="flex h-16 bg-red-200 flex-wrap content-center md:box-content">
                <h1 className="2xl:text-xl sm:text-sm font-semibold text-justify ml-10">{data.data.siteInfo.title}</h1>
            </div>
            <section>
                <div className='container mx-auto flex '>
                    <div className=' flex items-center border-2 border-solid'>
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
                        <h1 className='font-size1'>{data.data.posts[0].title}</h1>
                        <p className='size-vh-100'>{data.data.posts[0].date.start_date}</p>
                        <p>{data.data.posts[0].summary}</p>
                        {/* <div>
                            <h1 className='font-size1'>{data.data.posts[0].title}</h1>
                            <p className='size-vh-100'>{data.data.posts[0].date.start_date}</p>
                            <p>{data.data.posts[0].summary}</p>
                        </div> */}
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
