import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getProductType } from '../api/api';
/* eslint-disable */

const DesktopNav = () => {
  const router = useRouter();
  const { gender, type } = router.query;
  const [active, setActive] = useState(0);
  const [typeList, setTypeList] = useState({ type: {} });

  useEffect(() => {
    async function fetchData() {
      const result = await getProductType();
      setTypeList(result);
    }
    fetchData();
  }, []);

  const updateNav = useCallback(index => {
    setActive(index);
  }, []);

  useEffect(() => {
    if (router.route === '/products') {
      if (gender === 'men') {
        setActive('men_' + type);
      } else if (gender === 'women') {
        setActive('women_' + type);
      }
    } else if (router.route === '/brand') {
      setActive(9);
    }
  }, []);

  return (
    <SideNavRoot>
      <div className="col-auto bg-white">
        <div className="d-flex flex-column align-items-end text-black min-vh-100">
          <Link href="/" passHref>
            <a href="/" className="text-black text-decoration-none">
              <div className="d-flex zfit-logo align-items-center justify-content-center">
                <Image src="/images/z-fit.png" width={56} height={56} />
              </div>
            </a>
          </Link>
          <ul className="nav-list nav nav-pills flex-column align-items-end w-100" id="menu">
            <li className="w-100">
              <div className="w-100 navbar-title">MEN</div>
              <ul className=" nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                <li className="w-100">
                  <Link href="/products?gender=men&type=all" passHref>
                    <a
                      href="/"
                      className="nav-link"
                      className={active === 'men_all' ? 'nav-link active' : 'nav-link'}
                      onClick={() => updateNav('men_all')}>
                      <span>All</span>
                    </a>
                  </Link>
                </li>
                {typeList.men?.map((type, index) => {
                  const to = `/products?gender=men&type=${type.toLowerCase()}`;
                  return (
                    <li key={index} className="w-100">
                      <Link href={to} passHref>
                        <a
                          href="/"
                          className={active === 'men_' + type.toLowerCase() ? 'nav-link active' : 'nav-link'}
                          onClick={() => updateNav('men_' + type.toLowerCase())}>
                          <span>{type}</span>
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="w-100">
              <div className="w-100 navbar-title">WOMEN</div>
              <ul className=" nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                <li className="w-100">
                  <Link href="/products?gender=women&type=all" passHref>
                    <a
                      href="/"
                      className="nav-link"
                      className={active === 'women_all' ? 'nav-link active' : 'nav-link'}
                      onClick={() => updateNav('women_all')}>
                      <span>All</span>
                    </a>
                  </Link>
                </li>
                {typeList.women?.map((type, index) => {
                  const to = `/products?gender=women&type=${type.toLowerCase()}`;
                  return (
                    <li key={index} className="w-100">
                      <Link href={to} passHref>
                        <a
                          href="/"
                          className={active === 'women_' + type.toLowerCase() ? 'nav-link active' : 'nav-link'}
                          onClick={() => updateNav('women_' + type.toLowerCase())}>
                          <span>{type}</span>
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="w-100">
              <Link href="/brand" passHref>
                <a
                  href="/"
                  className={active === 9 ? 'nav-link navbar-title active' : 'nav-link navbar-title'}
                  onClick={() => updateNav(9)}>
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
    width: 100%;
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
      content: '→';
      padding-right: 5px;
    }
    color: black;
    background-color: white;
  }
  .zfit-logo {
    height: 119px;
    width: 100%;
    border-bottom: 1px solid black;
  }
  .navbar-title {
    text-align: right;
    color: black;
    padding: 5px 7px 5px 0;
  }
`;

DesktopNav.propTypes = {};

export default React.memo(DesktopNav);
