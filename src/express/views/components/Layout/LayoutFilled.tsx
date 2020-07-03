import React from "react";
import PropTypes from "prop-types";
import {Layout} from "./Layout";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";

export function LayoutFilled(props) {
  return (
    <Layout header={<Header />} footer={<Footer />}>
      {props.children}
    </Layout>
  );
}

LayoutFilled.propTypes = {
  children: PropTypes.node.isRequired,
};
