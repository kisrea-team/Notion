import BLOG from "@/blog.config";
import { getPostBlocks } from "@/lib/notion";
import { getGlobalNotionData } from "@/lib/notion/getNotionData";
import { setData } from "@/lib/notion/getPostBlocks";
import Main from "./main"; //引入一个页面
import Image from "next/image";
import { document } from "postcss";
// import { useEffect, useState } from 'react'
import React, { useEffect, useRef, useState } from "react";
import styles from './index.module.css';
//import anime from 'animejs/lib/anime.es.js';//动画库 https://animejs.com/documentation/#cssSelector
// @param {*} props
// @returns

const Index = (props) => {
  const anime = require("animejs");
  // console.log('ok')
  const prop = JSON.stringify(props);
  const listItems = props.posts.map((product) => (
    <li key={product.id}>{product.title}</li>
  ));
  const cover = {
    name: "图像",
    imageUrl: props.siteInfo.pageCover,
    imageSize: 100,
  };
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const h1Ref = useRef(null);
  useEffect(() => {
    // 挂载时执行的逻辑
    const newImageSize = { width: 400, height: 500 };
    setImageSize(newImageSize);


    //获取h1标签的内容
    const h1Element = h1Ref.current;
    console.log(h1Element)
    const text = h1Element.textContent;
    console.log(text)

    const characters = text.split(''); // 将文本拆分为单个字符
console.log(characters)
    const wrappedContent = characters.map((char, index) => (
      `<span key={${index}} class={styles["falling-letter"]>${char}</span>` // 使用数组的 map 方法生成每个字母的 <span> 元素
    ));
    console.log(wrappedContent)
    h1Element.innerHTML = ''; // 清空原来的文本内容
    // h1Element.append(...wrappedContent); // 添加新的包裹字母的 <span> 元素
    h1Element.innerHTML = wrappedContent.join('');

  }, []);
  //console.log(propp)
  return (
    <div className="">
      <Main />
      <div className="header flex align-Center">
        <h1 className="title">{props.siteInfo.title}</h1>
      </div>
      <div className="div-margin flex align-Center">
        <div className="h1-word-break">
          <div
            className="flex"
            style={{
              alignItems: "center",
              marginLeft: "20%",
              marginRight: "10%",
            }}
          >
            {/* <div className='line'></div> */}
            <h1 className="TextSize" ref={h1Ref}>
              {props.siteInfo.description}
            </h1>
          </div>
        </div>
        <div
          className="flex"
          style={{
            width: "55%",
            height: "50%",
            overflow: "hidden",
            justifyContent: "flex-end",
            position: "relative",
          }}
        >
          <Image
            className=""
            style={{ width: "100%", height: "30vw" }}
            src={cover.imageUrl}
            alt={"Photo of " + cover.name}
            width={imageSize.width}
            height={imageSize.height}
            // layout='fill'
          />
        </div>
      </div>
      <div>
        <div className="flex" style={{ position: "relative" }}>
          <div
            className="Notice"
            style={{ width: "45%", height: "500px", overflow: "hidden" }}
          >
            <Image
              src={props.notice.pageCover}
              alt="介绍封面"
              layout="responsive"
              width={1000}
              height={100}
            />
          </div>
          <div>
            <h2>{props.notice.summary}</h2>
            <p>这里显示详细内容，但我不会😢</p>
          </div>
        </div>
      </div>
    </div>
  );
};
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
