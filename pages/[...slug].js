
import { getGlobalNotionData } from '@/lib/notion/getNotionData'
import BLOG from "@/blog.config";
import { idToUuid } from 'notion-utils'
import { getPostBlocks } from '@/lib/notion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { isBrowser } from '@/lib/utils'
import { getPageTableOfContents } from '@/lib/notion/getPageTableOfContents'
import NotionPage from '@/components/NotionPage'


const GetStaticPaths = props => {
  console.log(props)
  const router = useRouter()
  if(!props.props.post)
  {
    return '404'
  }
  const { post,slug,siteInfo } = props.props
  
 
  
  // 文章锁🔐
  const [lock, setLock] = useState(post?.password && post?.password !== '')

  /**
   * 验证文章密码
   * @param {*} result
  */
  const validPassword = passInput => {
    const encrypt = md5(post.slug + passInput)
    if (passInput && encrypt === post.password) {
      setLock(false)
      return true
    }
    return false
  }

  // 文章加载
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(() => {
        if (isBrowser()) {
          const article = document.getElementById('notion-article')
          // if (!article) {
          //   router.push('/404').then(() => {
          //     console.warn('找不到页面', router.asPath)
          //   })
          // }
        }
      }, 8 * 1000) // 404时长 8秒
    }

    // 文章加密
    if (post?.password && post?.password !== '') {
      setLock(true)
    } else {
      setLock(false)
      if (!lock && post?.blockMap?.block) {
        post.content = Object.keys(post.blockMap.block).filter(key => post.blockMap.block[key]?.value?.parent_id === post.id)
        post.toc = getPageTableOfContents(post, post.blockMap)
      }
    }
  }, [post])

  const meta = {
    title: post ? `${post?.title} | ${siteInfo?.title}` : `${props?.siteInfo?.title || BLOG.TITLE} | loading`,
    description: post?.summary,
    type: post?.type,
    slug: post?.slug,
    image: post?.pageCoverThumbnail || (siteInfo?.pageCover || BLOG.HOME_BANNER_IMAGE),
    category: post?.category?.[0],
    tags: post?.tags
  }
  props = { ...props, lock, meta, slug,setLock, validPassword }
  console.log(props)
  // 根据页面路径加载不同Layout文件
  return (
    <div>
      <div className="flex h-16 bg-red-200 flex-wrap content-center md:box-content">
          <h1 className="2xl:text-xl sm:text-sm font-semibold text-justify ml-10">{props.meta.title}</h1>
      </div>
      <section className="w-full px-20 py-16 overflow-hidden grid grid-cols-1">
        <div className="flex flex-col content-center items-center">

          <h1 className=" w-1/2 text_vw overflow-hidden text-clip "></h1>
          <NotionPage post={post} />

        </div>
       

      </section>
    </div>
  );
 
}
  
  export async function getStaticPaths() {
    // const paths = new Array(10).fill(0).map((_, i) => ({
    //   params: { slug: i + 1 + "" }
    // }))
  
    // console.log("paths", paths)
    const from = 'slug-paths'
    const { allPages } = await getGlobalNotionData({ from })
    
     const paths=allPages?.map(row => ({ params: { slug: [row.id] } }))
   //console.log(allPages)
   // console.log(allPages)
   // return { paths, fallback: true }
    // if (!BLOG.isProd) {
    //   return {
    //     paths: [],
    //     fallback: true
    //   }
    // }
    
  
    // const from = 'slug-paths'
    // const { allPages } = await getGlobalNotionData({ from })
    // //  const paths=allPages?.map(row => ({ params: { slug: [row.slug] } }))
    // // console.log(paths)
    // console.log(allPages)
    return {
      paths: paths,
      fallback: true
    }
  }
  
  export async function getStaticProps({ params: { slug } }) {
    let fullSlug = slug.join('/')
    if (JSON.parse(BLOG.PSEUDO_STATIC)) {
      if (!fullSlug.endsWith('.html')) {
        fullSlug += '.html'
      }
    }
    const from = `index`
    const props = await getGlobalNotionData({ from })
    // 在列表内查找文章
    props.post = props?.allPages?.find((p) => {
      return p.id === fullSlug || p.id === idToUuid(fullSlug)
    })

    // // 处理非列表内文章的内信息
    // if (!props?.post) {
    //   const pageId = slug.slice(-1)[0]
    //   if (pageId.length >= 32) {
    //     const post = await getNotion(pageId)
    //     props.post = post
    //   }
    // }

    // 无法获取文章
    if (!props?.post) {
      props.post = null
      return { props, revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND) }
    }

    // 文章内容加载
    if (!props?.posts?.blockMap) {
      props.post.blockMap = await getPostBlocks(props.post.id, from)
    }

    // // 推荐关联文章处理
    // const allPosts = props.allPages.filter(page => page.type === 'Post' && page.status === 'Published')
    // if (allPosts && allPosts.length > 0) {
    //   const index = allPosts.indexOf(props.post)
    //   props.prev = allPosts.slice(index - 1, index)[0] ?? allPosts.slice(-1)[0]
    //   props.next = allPosts.slice(index + 1, index + 2)[0] ?? allPosts[0]
    //   props.recommendPosts = getRecommendPost(props.post, allPosts, BLOG.POST_RECOMMEND_COUNT)
    // } else {
    //   props.prev = null
    //   props.next = null
    //   props.recommendPosts = []
    // }

    // delete props.allPages
    return {
      props: {
        props,
        slug,
        revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
      } 
    }
  }
  
  export default GetStaticPaths
  