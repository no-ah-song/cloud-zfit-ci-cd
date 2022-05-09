import styled from 'styled-components';

const FooterRoot = styled.div`
  display: none;
  /* Small screen devices (600px and above) */
  @media only screen and (min-width: 600px) {
    //display: block;
  }
`;

const Footer = () => {
  return (
    <FooterRoot>
      <div className="container">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-muted">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-muted">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-muted">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-muted">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-muted">
                About
              </a>
            </li>
          </ul>
          <p className="text-center text-muted">© 2021 Company, Inc</p>
        </footer>
      </div>
    </FooterRoot>
  );
};
Footer.propTypes = {};

export default Footer;
