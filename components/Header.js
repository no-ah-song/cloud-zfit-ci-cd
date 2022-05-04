import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Close from "../assets/icon-close.svg";
import NavButton from "../assets/icon-header.svg";

const HeaderRoot = styled.div`
  .menu {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    max-width: 0;
    transition: 0.5s ease;
    z-index: 1;
    background-color: #eee;
    & > {
      width: 100%;
    }
  }
  header {
    height: 48px;
  }
`; /* eslint-disable */
const Header = ({ onClickOpen, onClickClose, isOpen }) => {
  return (
    <HeaderRoot>
      <header className="bg-white text-black border-bottom border-dark">
        <div className="justify-content-between d-flex h-100">
          {onClickOpen && (
            <div
              className="d-flex flex-wrap align-items-center h-100"
              style={{ width: "47px", borderRight: "solid 1px black" }}
            >
              <span
                className="d-flex align-items-center justify-content-center text-black text-decoration-none w-100"
                onClick={isOpen ? onClickClose : onClickOpen}
              >
                {isOpen ? <Close /> : <NavButton />}
              </span>
            </div>
          )}
          <div/>
          <div className="d-flex flex-wrap justify-content-end p-2 ">
            <ul className="nav col-12 col-lg-auto justify-content-end">
              <li>
                <Link href="/" passHref>
                  <a href="/" className="px-2 text-black">
                    z-emotion.com↗
                  </a>
                </Link>
              </li>
              <li>
                  <span className="px-2 text-black">
                    All Rights Reserved.®
                  </span>
              </li>
            </ul>

            <div className="text-end"></div>
          </div>
        </div>
      </header>
    </HeaderRoot>
  );
};
Header.propTypes = {};

export default Header;
