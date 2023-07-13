import BLOG from '@/blog.config'
import { getPostBlocks } from '@/lib/notion'
import { getGlobalNotionData } from '@/lib/notion/getNotionData'
import { setData } from '@/lib/notion/getPostBlocks'
import Main from "./main"//引入一个页面
import Image from 'next/image'
import { document } from 'postcss'
//import anime from 'animejs/lib/anime.es.js';//动画库 https://animejs.com/documentation/#cssSelector
// @param {*} props
// @returns



const Index = props => {
  const anime = require('animejs');
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
      <div className='header flex align-Center'>
        <h1 className='title'>{props.siteInfo.title}</h1>
      </div >
      <div className='div-margin flex align-Center'>
        <div className='h1-word-break flex'>
          <div className='line'></div>
          <h1>{props.siteInfo.description} //右侧图片怎么为固定大小过大时裁剪</h1>
        </div>
        <div style={{width:'500px',
        height:'500px',
        border:'solid transparent',
        position:'relative',
        }}>
          {/* <div style={{ position: 'relative' }}> */}
            <Image className="avatar"
              src={cover.imageUrl}
              alt={'Photo of ' + cover.name}
              width={1000}
              height={1000}
            />
          {/* </div> */}
        </div>
      </div>
      <div>
        <div className='flex' style={{ position: 'relative' }}>
          <Image className='Notice-Cover'
            src={props.notice.pageCover}
            alt='Page cover'
            // layout="fill"
            width={100}
            height={100}
          />
        </div>
        <div>
          <h2>{props.notice.summary}</h2>
          <p>这里显示详细内容，但我不会😢</p>
        </div>
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
