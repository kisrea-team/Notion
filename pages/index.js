import BLOG from '@/blog.config'
import { getPostBlocks } from '@/lib/notion'
import { getGlobalNotionData } from '@/lib/notion/getNotionData'
import Main from "./main"//引入一个页面
import Image from 'next/image'
/**
 * 首页布局
 * @param {*} props
 * @returns
 */
const Index = props => {
  // 动态切换主题
  console.log(props)
  return (
    <div>
      <Main />
      <div className='temp'>
      <h2 className=''>{props.siteInfo.title}</h2>
      <div className='tags'>
        <p>代码</p>
        {/* <p>{props.tagOptions.name}</p> 按理说应该是这样写的，但是不行 */}
      </div>
      </div>
      <div className='div-margin'>
        <div className='h1-word-break'>
          <h1>{props.siteInfo.description}</h1>
        </div>
        {/* <Image src={props.siteInfo.pageCover} /> */}
      </div>
    </div>
  );

}

/**
 * SSG 获取数据
 * @returns
 */
export async function getStaticProps() {
  const from = 'index'
  const props = await getGlobalNotionData({ from })

  const { siteInfo } = props
  props.posts = props.allPages.filter(page => page.type === 'Post' && page.status === 'Published')

  const meta = {
    title: `${siteInfo?.title} | ${siteInfo?.description}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: '',
    type: 'website'
  }
  // 处理分页
  if (BLOG.POST_LIST_STYLE === 'scroll') {
    // 滚动列表默认给前端返回所有数据
  } else if (BLOG.POST_LIST_STYLE === 'page') {
    props.posts = props.posts?.slice(0, BLOG.POSTS_PER_PAGE)
  }

  // 预览文章内容
  if (BLOG.POST_LIST_PREVIEW === 'true') {
    for (const i in props.posts) {
      const post = props.posts[i]
      if (post.password && post.password !== '') {
        continue
      }
      post.blockMap = await getPostBlocks(post.id, 'slug', BLOG.POST_PREVIEW_LINES)
    }

  }




  delete props.allPages

  return {
    props: {
      //meta,
      ...props
    },
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export default Index
