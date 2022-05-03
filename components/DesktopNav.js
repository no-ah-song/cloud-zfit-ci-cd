import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";

import IconZfit from "../assets/icon-nav-zfit.svg";
/* eslint-disable */

const DesktopNav = () => {
  const router = useRouter();
  const { gender, type } = router.query;
  const [active, setActive] = useState(0);

  const updateNav = useCallback((index) => {
    setActive(index);
  }, []);

  useEffect(() => {
    if (router.route === "/products") {
      if (gender === "men") {
        if (type === "all") {
          setActive(1);
        } else if (type === "top") {
          setActive(2);
        } else if (type === "bottom") {
          setActive(3);
        } else if (type === "outer") {
          setActive(4);
        }
      } else if (gender === "women") {
        if (type === "all") {
          setActive(5);
        } else if (type === "top") {
          setActive(6);
        } else if (type === "bottom") {
          setActive(7);
        } else if (type === "outer") {
          setActive(8);
        }
      }
    } else if (router.route === "/brand") {
      setActive(9);
    }
  }, []);

  return (
    <SideNavRoot>
      <div className="col-auto bg-white">
        <div className="d-flex flex-column align-items-end text-black min-vh-100">
          <div className="zfit-logo align-items-end ">
            <Link href="/" passHref>
              <a
                href="/"
                className="align-items-end text-black text-decoration-none"
              >
                <IconZfit />
              </a>
            </Link>
          </div>
          <ul
            className="nav-list nav nav-pills flex-column align-items-end w-100"
            id="menu"
          >
            <li className="w-100">
              <div className="w-100 navbar-title">MEN</div>
              <ul
                className=" nav flex-column ms-1"
                id="submenu1"
                data-bs-parent="#menu"
              >
                <li className="w-100">
                  <Link href="/products?gender=men&type=all" passHref>
                    <a
                      href="/"
                      className={active === 1 ? "nav-link active" : "nav-link"}
                      onClick={() => updateNav(1)}
                    >
                      <span>All</span>
                    </a>
                  </Link>
                </li>
                <li className="w-100">
                  <Link href="/products?gender=men&type=top" passHref>
                    <a
                      href="/"
                      className="nav-link"
                      className={active === 2 ? "nav-link active" : "nav-link"}
                      onClick={() => updateNav(2)}
                    >
                      <span>Top</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/products?gender=men&type=bottom" passHref>
                    <a
                      href="/"
                      className={active === 3 ? "nav-link active" : "nav-link"}
                      onClick={() => updateNav(3)}
                    >
                      <span>Bottom</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/products?gender=men&type=outer" passHref>
                    <a
                      href="/"
                      className={active === 4 ? "nav-link active" : "nav-link"}
                      onClick={() => updateNav(4)}
                    >
                      <span>Outer</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="w-100">
              <div className="w-100 navbar-title">WOMEN</div>
              <ul
                className=" nav flex-column ms-1"
                id="submenu2"
                data-bs-parent="#menu"
              >
                <li className="w-100">
                  <Link href="/products?gender=women&type=all" passHref>
                    <a
                      href="/"
                      className={active === 5 ? "nav-link active" : "nav-link"}
                      onClick={() => updateNav(5)}
                    >
                      <span>All</span>
                    </a>
                  </Link>
                </li>
                <li className="w-100">
                  <Link href="/products?gender=women&type=top" passHref>
                    <a
                      href="/"
                      className={active === 6 ? "nav-link active" : "nav-link"}
                      onClick={() => updateNav(6)}
                    >
                      <span>Top</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/products?gender=women&type=bottom" passHref>
                    <a
                      href="/"
                      className={active === 7 ? "nav-link active" : "nav-link"}
                      onClick={() => updateNav(7)}
                    >
                      <span>Bottom</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/products?gender=women&type=outer" passHref>
                    <a
                      href="/"
                      className={active === 8 ? "nav-link active" : "nav-link"}
                      onClick={() => updateNav(8)}
                    >
                      <span>Outer</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="w-100">
              <Link href="/brand" passHref>
                <a
                  href="/"
                  className={
                    active === 9
                      ? "nav-link navbar-title active"
                      : "nav-link navbar-title"
                  }
                  onClick={() => updateNav(9)}
                >
                  <span className="ms-1 d-none d-sm-inline">BRAND</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </SideNavRoot>
  );
};
const SideNavRoot = styled.div`
  width: 144px;
  padding: 0;
  border-right: 1px solid black;
  a {
    color: black;
    text-align: right;
    padding: 0 7px 0 0;
  }
  .nav-list {
    & > li {
      border-bottom: 1px solid black;
    }
  }
  .nav-link {
    padding: 5px 7px 5px 0;
    color: #777777;
  }
  .nav-pills .nav-link.active {
    &::before {
      content: "⟶";
    }
    color: black;
    background-color: white;
  }
  .zfit-logo {
    height: 119px;
    width: 100%;
    border-bottom: 1px solid black;
    text-align: right;
  }
  .navbar-title {
    text-align: right;
    color: black;
    padding: 5px 7px 5px 0;
  }
`;

DesktopNav.propTypes = {};

export default React.memo(DesktopNav);
