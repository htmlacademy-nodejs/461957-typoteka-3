import React from "react";
import {Layout} from "./Layout";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";

export function LayoutFilled(props) {
  return <Layout header={<Header />} main={props.main} footer={<Footer />} />;
}
