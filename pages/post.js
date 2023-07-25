import { getData } from '@/lib/notion/getPostBlocks';

// @param {*} props
// @returns

const Test = data => {
    console.log(data)
    return (
        <main className=''>
            <div className="flex h-16 bg-red-200 flex-wrap content-center md:box-content">
                <h1 className="2xl:text-xl sm:text-sm font-semibold text-justify ml-10">{data.data.siteInfo.title}</h1>
            </div>
            <div className='container mx-auto grid grid-cols-2 '>
                <section className='bg-pink-100'>
                    <div className='md:w-2/3'>
                        <p>hah</p>
                    </div>
                </section>
                <section className='bg-pink-100'>
                    <h1>two</h1>
                </section>
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
