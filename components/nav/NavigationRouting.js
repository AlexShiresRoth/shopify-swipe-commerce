import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import NavTab from "./NavTab";
import "./NavigationRouting.module.css";

const NavigationRouting = () => {
  const router = useRouter();
  const [navIndex, selectIndex] = useState(0);
  const navTabs = [
    { page: "Home", url: "/", id: uuidv4() },
    { page: "Products", url: "/products", id: uuidv4() },
    // { page: "Edit Products", url: "/editproducts", id: uuidv4() },
    { page: "App Settings", url: "/AnnotatedLayout", id: uuidv4() },
  ];

  const onClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };

  const clientRouting = navTabs.map((nav, i) => {
    return (
      <NavTab
        navObj={nav}
        key={nav.id}
        changeRoute={onClick}
        selectIndex={selectIndex}
        navIndex={navIndex}
        currentIndex={i}
      />
    );
  });

  return (
    <div className="nav-cstm">
      <div className="nav-cstm__inner">{clientRouting}</div>
    </div>
  );
};

NavigationRouting.propTypes = {};

export default NavigationRouting;
