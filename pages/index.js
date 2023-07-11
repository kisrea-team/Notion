import BLOG from '@/blog.config'
import { getPostBlocks } from '@/lib/notion'
import { getGlobalNotionData } from '@/lib/notion/getNotionData'
import { setData } from '@/lib/notion/getPostBlocks'
import Main from "./main"//引入一个页面
import Image from 'next/image'
import { document } from 'postcss'


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
      <canvas id="color-canvas"></canvas>
      <div className='header flex align-Center target-element'>
     
        <h2 className='title'>{props.siteInfo.title}</h2>
      </div >
      <div className='div-margin flex align-Center'>
        <div className='h1-word-break flex'>
          <div className='line'></div>
          <h1>{props.siteInfo.description}</h1>
        </div>
        <Image className="avatar"
          //layout="fill"
          src={cover.imageUrl}
          alt={'Photo of ' + cover.name}
          width={1000}
          height={300}
        />
      </div>
    </div >
  );

}
function getRandomImageColor(imageUrl) {
  const canvas = document.getElementById('color-canvas');
  const context = canvas.getContext('2d');
  const image = new Image();
  image.crossOrigin = 'Anonymous';

  image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    const pixelData = context.getImageData(0, 0, image.width, image.height).data;
    const randomIndex = Math.floor(Math.random() * (pixelData.length / 4)) * 4;
    const r = pixelData[randomIndex];
    const g = pixelData[randomIndex + 1];
    const b = pixelData[randomIndex + 2];
    const randomColor = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('target-element').style.backgroundColor = randomColor;
  };

  image.src = imageUrl;
  getRandomImageColor(cover.imageUrl);
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
