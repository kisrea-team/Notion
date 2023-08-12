import { getData } from '@/lib/notion/getPostBlocks';
// import { getPageData } from '@/lib/notion/getPageData';
// import { getGlobalNotionData } from '@/lib/notion/getNotionData';
// import { getDatabase } from '@/lib/notion/getDatabase';
// import { getCollectionData } from '@/lib/notion/getCollectionData'; 
import Image from 'next/image';
// import { list } from 'postcss';
// @param {*} props
// @returns

const Test = data => {
    // const post = data.data.posts.(list => {
    //     <div>
    //         <a href={list.id}>
    //             <div className='bg-pink-100'>
    //                 <h1>{list.title}</h1>
    //                 <p>{list.date.start_date}</p>
    //                 <p>{list.posts[0].summary}</p>

    //             </div>
    //             <div className="mt-8 mx-14">
    //                 {list.tagItems((item, index) => (
    //                     <span key={index}
    //                         style={{ backgroundColor: item.color }}
    //                         className=" colored-texttext-l p-2calc rounded-md leading-8 m-1">
    //                         {item.name}
    //                     </span>))}
    //             </div>
    //         </a>
    //     </div>
    // });
    console.log(data)
    return (
        <main className=''>
            <div className="flex h-16 bg-red-200 flex-wrap content-center md:box-content">
                <h1 className="2xl:text-xl sm:text-sm font-semibold text-justify ml-10">{data.data.siteInfo.title}</h1>
            </div>
            <div className='container mx-auto flex'>
                <div className=''>
                    <Image
                        style={{}}
                        className=''
                        src={data.data.posts[1].pageCover}
                        alt="noticePageCover"
                        width={250}
                        height={300}
                        sizes="(max-width: 768px) 100vw"
                        priority={true}
                        objectFit="contain"
                    />
                </div>
                <h1 className='font-size1'>{data.data.posts[0].title}</h1>
                <p>{data.data.posts[0].date.start_date}</p>
                <p>{data.data.posts[0].summary}</p>

                <div className='bg-pink-100'>
                    <h1>two</h1>
                </div>
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
