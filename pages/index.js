import BLOG from "@/blog.config";
import { getPostBlocks } from "@/lib/notion";
import { getGlobalNotionData } from "@/lib/notion/getNotionData";
import { setData } from "@/lib/notion/getPostBlocks";
import Main from "./main"; //引入一个页面
import Image from "next/image";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
// import { document } from "postcss";
// import { useEffect, useState } from 'react'
import React, { useEffect, useRef, useState } from "react";
import anime from "animejs"
// import Test from "./main";

//import anime from 'animejs/lib/anime.es.js';//动画库 https://animejs.com/documentation/#cssSelector
// @param {*} props
// @returns

const Index = (props) => {
  // const anime = require("animejs");
  // anime({
  //   targets: '.cover',
  //   translateX: 250
  // });
  // console.log('ok')


  // const animationRef = React.useRef(null);
  // React.useEffect(() => {
  //   animationRef.current = anime({
  //     targets: '.one1',
  //     translateY: -250,
  //     duration: 3000
  //   });
  // }, []);


  console.log(props)
  const prop = JSON.stringify(props);
  const listItems = props.posts.map((product) => (
    <li key={product.id}>{product.title}</li>
  ));
  const cover = {
    name: "图像",
    imageUrl: props.siteInfo.pageCover,
    imageSize: 100,
  };


  // ------------------------------------------------------------------------//
  return (
    <div>
      <div className="flex h-14 bg-red-200 flex-wrap content-center md:box-content">
        <h1 className="2xl:text-2xl sm:text-sm  text-justify ml-10">{props.siteInfo.title}'Blog</h1>
        <p className="text-sm">最新文章更新于{props.posts[0].createdTime}</p>
      </div>
      <section className="w-full px-20 py-16 overflow-hidden grid grid-cols-1">
        <div className="flex flex-col content-center items-center">

          <h1 className=" w-1/2 text_vw overflow-hidden text-clip ">{props.siteInfo.description}</h1>
          <Image
            className="w-full h-64 overflow-hidden"
            src={props.siteInfo.pageCover}
            alt="PageCover"
            width={500}
            height={100}
            layout="cover"
          />
        </div>
        <p>网站所有者</p>

      </section>
    </div>
  );
};
// -------------------------------------------------------------------------//


/**
 * SSG 获取数据
 * @returns
 */
export async function getStaticProps() {
  const from = "index";
  const props = await getGlobalNotionData({ from });

  const { siteInfo } = props;
  props.posts = props.allPages.filter(
    (page) => page.type === "Post" && page.status === "Published"
  );

  // 预览文章内容
  if (BLOG.POST_LIST_PREVIEW === "true") {
    for (const i in props.posts) {
      const post = props.posts[i];
      if (post.password && post.password !== "") {
        continue;
      }
      post.blockMap = await getPostBlocks(
        post.id,
        "slug",
        BLOG.POST_PREVIEW_LINES
      );
    }
  }
  // const prop = JSON.stringify(props);
  setData(props);
  return {
    props: {
      ...props,
    },
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND),
  };
}

export default Index;
