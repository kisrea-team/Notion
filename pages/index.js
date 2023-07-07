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
  // console.log(props)
  console.log('ok')
  var prop=JSON.stringify(props);
  //console.log(prop)
  
  const listItems = props.posts.map(product =>
    <li key={product.id}>
      {product.title}
    </li>
  );
  const cover = {
    name: '图像',
    imageUrl: props.siteInfo.pageCover,
    imageSize: 200,
  };
  console.log(props)
  return (
    <div>
      <Main />
      <div className='temp'>
      <h2 className=''>{props.siteInfo.title}</h2>
      <ul>{listItems}</ul>
      <div className='tags'>
        <p>代码</p>
        {/* <p>{props.tagOptions.name}</p> 按理来说这么些也是不行的，这是数组，不是一个值 */}
      </div>
      </div>
      <div className='div-margin'>
        <div className='h1-word-break'>
          <h1>{props.siteInfo.description}</h1>
        </div>
        <img
        className="avatar"
        src={cover.imageUrl}
        alt={'Photo of ' + cover.name}
        style={{
          width: cover.imageSize,
          height: cover.imageSize
        }}
      />
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

  return {
    props: {
      ...props
    },
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }

}

export default Index
