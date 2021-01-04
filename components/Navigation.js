import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";

const Navigation = (props) => {
  const router = useRouter();
  return (
    <div>
      <Link href={"/"}>
        <a>Home</a>
      </Link>
      <Link href={"/products"}>
        <a>Products</a>
      </Link>
      <Link href={"/AnnotatedLayout"}>
        <a>App Settings</a>
      </Link>
    </div>
  );
};

Navigation.propTypes = {};

export default Navigation;
