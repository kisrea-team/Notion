import BLOG from "@/blog.config";
import { getPostBlocks } from "@/lib/notion";
import { getGlobalNotionData } from "@/lib/notion/getNotionData";
import { setData } from "@/lib/notion/getPostBlocks";
//import Main from "./main"; //引入一个页面
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
// import { document } from "postcss";
// import { useEffect, useState } from 'react'
// import React, { useEffect, useRef, useState } from "react";
// import anime from "animejs"
// import colors from "tailwindcss/colors";
// import Test from "./main";

//import anime from 'animejs/lib/anime.es.js';//动画库 https://animejs.com/documentation/#cssSelector
// @param {*} props
// @returns

//页面底部的表格布局的代码
const Index = (props) => {
  const listItems = props.stars.map((product) => (
    // eslint-disable-next-line react/jsx-key
    <div>
      <a href={product.id}>
        <div className="flex flex-col flex-wrap items-center border-inherit border">
          <h1 className="flex items-center flex-col text-5xl p-14 leading-snug font-normal">
            {product.title}
            <span className=" text-lg text-slate-800">
              {product.date.start_date}
            </span>
          </h1>
          <Image
            className="w-4/5 rounded-xl drop-shadow-2xl hover:shadow-2xl"
            src={product.pageCover}
            alt="postImage"
            width={9999}
            height={9999}
            layout="cover"
          />
          <div className="mt-8 mx-14">
            {product.tagItems.map((item, index) => (
              <span
                key={index}
                style={{ backgroundColor: item.color }}
                className=" colored-texttext-l p-2calc rounded-md leading-8 m-1"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </a>
    </div>
  ));
  console.log(props);
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

  /// *页面布局
  ///

  return (
    <div>
      {/* 页眉 */}
      <div className="flex h-16 bg-red-200 flex-wrap content-center md:box-content">
        <h1 className="2xl:text-xl sm:text-sm font-semibold text-justify ml-10">
          {props.siteInfo.title}
        </h1>
      </div>
      <div className="flex flex-wrap content-center justify-center w-full bg-white h-10 rounded-lg border-b border-gray-200">
        <p className="text-sm">最新文章更新于{props.posts[0].createdTime}</p>
      </div>
      <div className="container m-auto">
        {/* 图文布局 */}
        {/* 种一棵树是十年前…… */}
        <section className="m_photo_text">
          <div className="m_text">
            <h1 className=" text_vw_30 sm:text-5xl overflow-hidden text-clip font-medium bg-red-800">
              {props.siteInfo.description}
            </h1>
            <p className="pt-6 text_vw_15 font-semibold text-right">
              @{props.notice.Person[0].name}{" "}
            </p>
          </div>
          <div className="m_photo">
            <Image
              className=""
              src={props.siteInfo.pageCover}
              alt="PageCover"
              width={9999}
              height={9999}
              layout="cover"
              // objectFit="contain"
            />
          </div>
        </section>
        {/* 介绍…… */}
        <section className="m_photo_text">
          <div className="m_photo">
            <Image
              src={props.notice.pageCover}
              alt="noticePageCover"
              width={9999}
              height={9999}
              layout="cover"
            />
          </div>
          <div className="m_text">
            <h1 className="md:text-5xl sm:text-4xl  font-extrabold">介绍</h1>
            <p className="pt-6 pb-10 indent-8 text-xl">
              <b>
                这里写的是介绍里的文字 介绍里的文字 介绍里的文字 介绍里的文字
                介绍里的文字 介绍里的文字介绍里的文字
              </b>
            </p>
            <p className="text-end">2023/07/20</p>
          </div>
        </section>
        <section>
          <div className="grid grid-cols-3 bg-slate-50 font-normal">
            {listItems}
          </div>
        </section>
        <section>
          <div>
            <h1>{props.notice.summary}</h1>
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
