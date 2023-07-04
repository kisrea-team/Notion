// 注: process.env.XX是Vercel的环境变量，配置方式见：https://docs.tangly1024.com/zh/features/personality
const BLOG = {
  // Important page_id！！！Duplicate Template from  https://www.notion.so/tanghh/02ab3b8678004aa69e9e415905ef32a5
  NOTION_PAGE_ID:
      process.env.NOTION_PAGE_ID || '02ab3b8678004aa69e9e415905ef32a5',
  PSEUDO_STATIC: false, // 伪静态路径，开启后所有文章URL都以 .html 结尾。
  NEXT_REVALIDATE_SECOND: process.env.NEXT_PUBLIC_REVALIDATE_SECOND || 5, // 更新内容缓存间隔 单位(秒)；即每个页面有5秒的纯静态期、此期间无论多少次访问都不会抓取notion数据；调大该值有助于节省Vercel资源、同时提升访问速率，但也会使文章更新有延迟。
  THEME: process.env.NEXT_PUBLIC_THEME || 'hexo', // 主题， 支持 ['next','hexo',"fukasawa','medium','example'] @see https://preview.tangly1024.com
  THEME_SWITCH: process.env.NEXT_PUBLIC_THEME_SWITCH || false, // 是否显示切换主题按钮
  LANG: process.env.NEXT_PUBLIC_LANG || 'zh-CN', // e.g 'zh-CN','en-US'  see /lib/lang.js for more.
  SINCE: 2021, // e.g if leave this empty, current year will be used.
  APPEARANCE: process.env.NEXT_PUBLIC_APPEARANCE || 'light', // ['light', 'dark', 'auto'], // light 日间模式 ， dark夜间模式， auto根据时间和主题自动夜间模式
  APPEARANCE_DARK_TIME: process.env.NEXT_PUBLIC_APPEARANCE_DARK_TIME || [18, 6], // 夜间模式起至时间，false时关闭根据时间自动切换夜间模式

  // 3.14.1版本后，欢迎语在此配置，英文逗号隔开 ,  即可支持多个欢迎语打字效果。
  GREETING_WORDS: process.env.NEXT_PUBLIC_GREETING_WORDS || 'Hi，我是一个程序员, Hi，我是一个打工人,Hi，我是一个干饭人,欢迎来到我的博客🎉',

  CUSTOM_MENU: process.env.NEXT_PUBLIC_CUSTOM_MENU || false, // 支持Menu 类型，从3.12.0版本起，各主题将逐步支持灵活的二级菜单配置，替代了原来的Page类型，此配置是试验功能、默认关闭。

  AUTHOR: process.env.NEXT_PUBLIC_AUTHOR || 'NotionNext', // 您的昵称 例如 tangly1024
  BIO: process.env.NEXT_PUBLIC_BIO || '一个普通的干饭人🍚', // 作者简介
  LINK: process.env.NEXT_PUBLIC_LINK || 'https://tangly1024.com', // 网站地址
  KEYWORDS: process.env.NEXT_PUBLIC_KEYWORD || 'Notion, 博客', // 网站关键词 英文逗号隔开
  // 社交链接，不需要可留空白，例如 CONTACT_WEIBO:''
  CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '', // 邮箱地址 例如mail@tangly1024.com
  CONTACT_WEIBO: process.env.NEXT_PUBLIC_CONTACT_WEIBO || '', // 你的微博个人主页
  CONTACT_TWITTER: process.env.NEXT_PUBLIC_CONTACT_TWITTER || '', // 你的twitter个人主页
  CONTACT_GITHUB: process.env.NEXT_PUBLIC_CONTACT_GITHUB || '', // 你的github个人主页 例如 https://github.com/tangly1024
  CONTACT_TELEGRAM: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || '', // 你的telegram 地址 例如 https://t.me/tangly_1024
  CONTACT_LINKEDIN: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || '', // 你的linkedIn 首页
  CONTACT_INSTAGRAM: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || '', // 您的instagram地址

  NOTION_HOST: process.env.NEXT_PUBLIC_NOTION_HOST || 'https://www.notion.so', // Notion域名，您可以选择用自己的域名进行反向代理，如果不懂得什么是反向代理，请勿修改此项

  // 网站字体
  FONT_STYLE: process.env.NEXT_PUBLIC_FONT_STYLE || 'font-serif', // ['font-serif','font-sans'] 两种可选，分别是衬线和无衬线: 参考 https://www.jianshu.com/p/55e410bd2115
  FONT_URL: [
    // 字体CSS 例如 https://npm.elemecdn.com/lxgw-wenkai-webfont@1.6.0/style.css
    'https://fonts.googleapis.com/css?family=Bitter&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300&display=swap'
  ],
  FONT_SANS: [
    // 无衬线字体 例如'LXGW WenKai'
    'Bitter',
    '"PingFang SC"',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Hiragino Sans GB"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Segoe UI"',
    '"Noto Sans SC"',
    'HarmonyOS_Regular',
    '"Microsoft YaHei"',
    '"Helvetica Neue"',
    'Helvetica',
    '"Source Han Sans SC"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"'
  ],
  FONT_SERIF: [
    // 衬线字体 例如'LXGW WenKai'
    'Bitter',
    '"Noto Serif SC"',
    'SimSun',
    '"Times New Roman"',
    'Times',
    'serif',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Apple Color Emoji"'
  ],
  FONT_AWESOME: process.env.NEXT_PUBLIC_FONT_AWESOME_PATH || '/css/all.min.css', // font-awesome 字体图标地址、默认读取本地; 可选 https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/font-awesome/6.0.0/css/all.min.css


  POST_LIST_STYLE: process.env.NEXT_PUBLIC_PPOST_LIST_STYLE || 'page', // ['page','scroll] 文章列表样式:页码分页、单页滚动加载
  POST_LIST_PREVIEW: process.env.NEXT_PUBLIC_POST_PREVIEW || 'false', //  是否在列表加载文章预览
  POST_PREVIEW_LINES: 12, // 预览博客行数
  POST_RECOMMEND_COUNT: 6, // 推荐文章数量
  POSTS_PER_PAGE: 12, // post counts per page
  POSTS_SORT_BY: process.env.NEXT_PUBLIC_POST_SORT_BY || 'notion', // 排序方式 'date'按时间,'notion'由notion控制

  PREVIEW_CATEGORY_COUNT: 16, // 首页最多展示的分类数量，0为不限制
  PREVIEW_TAG_COUNT: 16, // 首页最多展示的标签数量，0为不限制


 
 

  // 自定义配置notion数据库字段名
  NOTION_PROPERTY_NAME: {
    password: process.env.NEXT_PUBLIC_NOTION_PROPERTY_PASSWORD || 'password',
    type: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE || 'type', // 文章类型，
    type_post: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_POST || 'Post', // 当type文章类型与此值相同时，为博文。
    type_page: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_PAGE || 'Page', // 当type文章类型与此值相同时，为单页。
    type_notice:
        process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_NOTICE || 'Notice', // 当type文章类型与此值相同时，为公告。
    type_menu: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_MENU || 'Menu', // 当type文章类型与此值相同时，为菜单。
    type_sub_menu:
        process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_SUB_MENU || 'SubMenu', // 当type文章类型与此值相同时，为子菜单。
    title: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TITLE || 'title', // 文章标题
    status: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS || 'status',
    status_publish:
        process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_PUBLISH || 'Published', // 当status状态值与此相同时为发布，可以为中文
    status_invisible:
        process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_INVISIBLE || 'Invisible', // 当status状态值与此相同时为隐藏发布，可以为中文 ， 除此之外其他页面状态不会显示在博客上
    summary: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SUMMARY || 'summary',
    slug: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SLUG || 'slug',
    category: process.env.NEXT_PUBLIC_NOTION_PROPERTY_CATEGORY || 'category',
    date: process.env.NEXT_PUBLIC_NOTION_PROPERTY_DATE || 'date',
    tags: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TAGS || 'tags',
    icon: process.env.NEXT_PUBLIC_NOTION_PROPERTY_ICON || 'icon'
  },



  // 作废配置
  AVATAR: process.env.NEXT_PUBLIC_AVATAR || '/avatar.svg', // 作者头像，被notion中的ICON覆盖。若无ICON则取public目录下的avatar.png
  TITLE: process.env.NEXT_PUBLIC_TITLE || 'NotionNext BLOG', // 站点标题 ，被notion中的页面标题覆盖；此处请勿留空白，否则服务器无法编译
  HOME_BANNER_IMAGE:
      process.env.NEXT_PUBLIC_HOME_BANNER_IMAGE || './bg_image.jpg', // 首页背景大图, 会被notion中的封面图覆盖，若无封面图则会使用代码中的 /public/bg_image.jpg 文件
  DESCRIPTION:
      process.env.NEXT_PUBLIC_DESCRIPTION || '这是一个由NotionNext生成的站点', // 站点描述，被notion中的页面描述覆盖

  // 网站图片
  IMG_URL_TYPE: process.env.NEXT_PUBLIC_IMG_TYPE || 'Notion', // 此配置已失效，请勿使用；AMAZON方案不再支持，仅支持Notion方案。 ['Notion','AMAZON'] 站点图片前缀 默认 Notion:(https://notion.so/images/xx) ， AMAZON(https://s3.us-west-2.amazonaws.com/xxx)
  IMG_SHADOW: process.env.NEXT_PUBLIC_IMG_SHADOW || false, // 文章图片是否自动添加阴影

  // 开发相关
  NOTION_ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN || '', // Useful if you prefer not to make your database public
  DEBUG: process.env.NEXT_PUBLIC_DEBUG || false, // 是否显示调试按钮
  ENABLE_CACHE: process.env.ENABLE_CACHE || false, // 开启缓存会将Notion数据缓存在内存中，通常在开发调试中使用，正式部署开启此功能意义不大。
  isProd: process.env.VERCEL_ENV === 'production', // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)  isProd: process.env.VERCEL_ENV === 'production' // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  VERSION: process.env.NEXT_PUBLIC_VERSION // 版本号
}

module.exports = BLOG
