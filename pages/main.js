import { getData } from '@/lib/notion/getPostBlocks';

// @param {*} props
// @returns

const Test = data => {
    console.log(data)
    return(
        <div>
            <h1>This is a test{props.siteInfo.title}</h1>

        </div>
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
