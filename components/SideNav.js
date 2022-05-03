import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";


const SideNav = (props) => {
  return (
    <>
      <LnavBar>
        <nav className="nav">
          <div>
            <a href="#" className="nav_logo">
              <i className="bx bx-layer nav_logo-icon"></i>
              <span className="nav_logo-name">Bootstrap</span>
            </a>
            <div className="nav_list">
              <a href="#" className="nav_link active">
                <i className="bx bx-grid-alt nav_icon"></i>
                <span className="nav_name">Dashboard</span>
              </a>
              <a href="#" className="nav_link">
                <i className="bx bx-user nav_icon"></i>
                <span className="nav_name">Users</span>
              </a>
              <a href="#" className="nav_link">
                <i className="bx bx-message-square-detail nav_icon"></i>
                <span className="nav_name">Messages</span>
              </a>
              <a href="#" className="nav_link">
                <i className="bx bx-bookmark nav_icon"></i>
                <span className="nav_name">Bookmark</span>
              </a>
              <a href="#" className="nav_link">
                <i className="bx bx-folder nav_icon"></i>
                <span className="nav_name">Files</span>
              </a>
              <a href="#" className="nav_link">
                <i className="bx bx-bar-chart-alt-2 nav_icon"></i>
                <span className="nav_name">Stats</span>
              </a>
            </div>
          </div>
        </nav>
      </LnavBar>
    </>
  );
};
const LnavBar = styled.div`
  top: 0;
  left: -30%;
  width: var(--nav-width);
  height: 100vh;
  background-color: var(--first-color);
  padding: 0.5rem 1rem 0 0;
  transition: 0.5s;
  display: none;
  z-index: var(--z-fixed) .nav {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  .nav_logo,
  .nav_link {
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    column-gap: 1rem;
    padding: 0.5rem 0 0.5rem 1.5rem;
  }

  .nav_logo {
    margin-bottom: 2rem;
  }

  .nav_logo-icon {
    font-size: 1.25rem;
    color: var(--white-color);
  }

  .nav_logo-name {
    color: var(--white-color);
    font-weight: 700;
  }

  .nav_link {
    position: relative;
    color: var(--first-color-light);
    margin-bottom: 1.5rem;
    transition: 0.3s;
  }

  .nav_link:hover {
    color: var(--white-color);
  }

  .nav_icon {
    font-size: 1.25rem;
  }

  @media only screen and (min-width: 600px) {
    //display: block;
  }
`;
SideNav.propTypes = {};

export default SideNav;
