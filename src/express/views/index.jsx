import React from "react";
import Header from "./components/Header/Header.jsx";
import {Layout} from "./components/Layout/Layout";

export default function MainPage(props) {
  return (
    <Layout header={<Header />}>
      <div>Hello {props.name}</div>
    </Layout>
  );
}
