import React, { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./index.less";
import Test from "../Test";

function Page(props) {
  useEffect(() => {
    return () => {
      console.log("客户端路由跳转");
      console.log("但我被卸载了");
      console.log("input被清空了");
    };
  }, []);
  return (
    <div className="normal">
      <div className="welcome" />
      <ul className="list">
        {props.news &&
          props.news.map((item) => (
            <li key={item.id}>
              <div>文章标题: {item.title}</div>
              <div className="toDetail">
                <Link to={`/news/${item.id}`}>点击查看详情</Link>
              </div>
            </li>
          ))}
      </ul>
      独立在Route之外的input: <input></input>
      <Link to="/Test">路由跳转到Test</Link>
      <Switch>
        <Route path="/Test" component={Test}></Route>
      </Switch>
    </div>
  );
}

Page.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  return __isBrowser__
    ? (await window.fetch("/api/getIndexData")).json()
    : ctx.service.api.index();
};

export default Page;
