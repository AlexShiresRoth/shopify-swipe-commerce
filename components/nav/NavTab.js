import React from "react";
import PropTypes from "prop-types";
import "./NavigationRouting.module.css";

const NavTab = ({
  navObj,
  selectIndex,
  changeRoute,
  currentIndex,
  navIndex,
}) => {
  return (
    <a
      href={navObj.url}
      onPointerDown={(e) => {
        changeRoute(e, navObj.url);
        selectIndex(currentIndex);
      }}
      className={currentIndex === navIndex ? "active-link" : "inactive-link"}
    >
      {navObj.page}
    </a>
  );
};

NavTab.propTypes = {
  navObj: PropTypes.object,
  selectIndex: PropTypes.func,
  changeRoute: PropTypes.func,
  currentIndex: PropTypes.number,
  navIndex: PropTypes.number,
};

export default NavTab;
