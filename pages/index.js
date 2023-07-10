import BLOG from '@/blog.config'
import { getPostBlocks } from '@/lib/notion'
import { getGlobalNotionData } from '@/lib/notion/getNotionData'
import { setData } from '@/lib/notion/getPostBlocks';
import Main from "./main"//引入一个页面
import Image from 'next/image'


// @param {*} props
// @returns



const Index = props => {
  console.log('ok')
  const prop = JSON.stringify(props);
  const listItems = props.posts.map(product =>
    <li key={product.id}>
      {product.title}
    </li>
  );
  const cover = {
    name: '图像',
    imageUrl: props.siteInfo.pageCover,
    imageSize: 100,
  };
  //console.log(propp)
  return (
    <div className=''>
      <Main />
      <div className='temp flex align-Center'>
        <h2 className=''>{props.siteInfo.title}</h2>
        {/* <ul>{listItems}</ul> */}
        <div className='tags'>
          <p>代码</p>
        </div>
        <div className='tags'>
          <p>tags</p>
        </div>
      </div >
      <div className='div-margin flex align-Center'>
        <div className='h1-word-break flex'>
          <div className='line'></div>
          <h1>{props.siteInfo.description}</h1>
        </div>
        <Image className="avatar"
          // layout="fill"
          src={cover.imageUrl}
          alt={'Photo of ' + cover.name}
          width={1000}
          height={300}
        />
      </div>
    </div >
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
  // const prop = JSON.stringify(props);
  setData(props)
  return {
    props: {
      ...props
    },
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }

}

export default Index
