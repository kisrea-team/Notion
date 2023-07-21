import { getData } from '@/lib/notion/getPostBlocks';
import { getGlobalNotionData } from '@/lib/notion/getNotionData'

// @param {*} props
// @returns

const Test = data => {
    const props=data.data
    //console.log(props)
  
}
/**
 * SSG 获取数据
 * @returns
 */
export async function getStaticProps() {
    const from = 'test'
    const { allPages } = await getGlobalNotionData({ from })
    console.log(allPages)
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
