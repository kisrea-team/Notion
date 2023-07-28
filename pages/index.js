import BLOG from "@/blog.config";
import {getPostBlocks} from "@/lib/notion";
import {getGlobalNotionData} from "@/lib/notion/getNotionData";
import {setData} from "@/lib/notion/getPostBlocks";
//import Main from "./main"; //引入一个页面
import Image from "next/image";
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})
// import { document } from "postcss";
// import { useEffect, useState } from 'react'
import React from "react";
// import anime from "animejs"
// import colors from "tailwindcss/colors";
// import Test from "./main";

//import anime from 'animejs/lib/anime.es.js';//动画库 https://animejs.com/documentation/#cssSelector
// @param {*} props
// @returns

const Index = (props) => {
  const listItems = props.stars.map(product =>

    <div>
      <a href={product.id}>
        <div className="flex flex-col flex-wrap justify-around items-center border-inherit border">
          <h1 className="text-5xl p-14 leading-snug font-normal">{product.title}</h1>
                    <Image
                        className="w-4/5 rounded-xl drop-shadow-2xl hover:shadow-2xl"
                        src={product.pageCover}
                        alt="postImage"
                        width={9999}
                        height={9999}
                        layout="cover"
                    />
                    <p className="m-2.5">
                      <span className="text-l p-3calc rounded-md bg-blue leading-7 m-1">{product.tags[0]}</span>
                      <span className="text-l p-3calc rounded-md bg-pink-100 leading-7 m-1">{product.tags[1]}</span>
                      <span className="text-l p-3calc rounded-md bg-pink-100 leading-7 m-1">{product.tags[2]}</span>
                    </p>
        </div>
      </a>
    </div>
      );
  console.log(props)
  // const prop = JSON.stringify(props);
  // const listItems = props.posts.map((product) => (
  //     <li key={product.id}>{product.title}</li>
  // ));
  // const cover = {
  //   name: "图像",
  //   imageUrl: props.siteInfo.pageCover,
  //   imageSize: 100,
  // };
  // ------------------------------------------------------------------------//
  return (
      <div className="">
        <div className="flex h-16 bg-red-200 flex-wrap content-center md:box-content">
          <h1 className="2xl:text-xl sm:text-sm font-semibold text-justify ml-10">{props.siteInfo.title}</h1>
        </div>
        <div
            className="flex flex-wrap content-center justify-center w-full bg-white h-10 rounded-lg border-b border-gray-200">
          <p className="text-sm">最新文章更新于{props.posts[0].createdTime}</p>
        </div>
        <div className="px-20 pb-16">
          <section className=" w-full overflow-hidden grid grid-cols-1 grid-rows-2">
            <div className="grid w-1/3 content-center">
              <h1 className="text_vw_30 overflow-hidden text-clip font-medium ">{props.siteInfo.description}</h1>
              <p className="flex justify-end flex-wrap pt-6 text_vw_15 text-left font-semibold">@{props.notice.Person[0].name} </p>
            </div>
            <div className="grid grid-cols-2 justify-items-end  content-center items-center h-full">
              <div>
              </div>
              <div className="pt--1">
                <Image
                    className="width-auto"
                    src={props.siteInfo.pageCover}
                    alt="PageCover"
                    width={9999}
                    height={9999}
                    layout="cover"
                    objectFit="contain"
                />
              </div>
            </div>
          </section>
          <section className="grid grid-cols-2 gap-8">
            <div className="w-11/12 h-1/2">
              <Image
                  src={props.notice.pageCover}
                  alt="noticePageCover"
                  width={9999}
                  height={9999}
                  layout="cover"
              />
            </div>
            <div className="pt-12 w-3/4">
              <h1 className="text-5xl font-extrabold">介绍</h1>
              <p className="pt-6 pb-10 indent-8 text-xl"><b>这里写的是介绍里的文字 介绍里的文字 介绍里的文字
                介绍里的文字 介绍里的文字 介绍里的文字介绍里的文字</b></p>
              <p className="text-end">2023/07/20</p>

            </div>
          </section>
          <section>
            <div className="grid grid-cols-3 bg-slate-50 font-normal">
              {listItems}
            </div>
          </section>
        </div>
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
  const props = await getGlobalNotionData({from});

  const {siteInfo} = props;
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