import { useContext, useEffect } from 'react';
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Store } from './Store';

//toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LinkContainer } from 'react-router-bootstrap';

function App() {
  const {
    state: { mode, cart },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
    // console.log(mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' });
  };

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" autoClose={499} limit={1} />
      <header>
        <div>
          <Navbar expand="lg">
            <LinkContainer to="/">
              <Navbar.Brand>tsamazona</Navbar.Brand>
            </LinkContainer>
            {/* Nav Right */}
            <Nav className="anjing">
              {/* Button */}
              <Button variant={mode} onClick={switchModeHandler}>
                <i
                  className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                ></i>
              </Button>
              {/* Cart */}
              <a href="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce(
                      (a: number, c: number) => a + c.quantity,
                      0
                    )}
                  </Badge>
                )}
              </a>
              {/* Sign In */}
              <a href="/signin" className="nav-link">
                Sign In
              </a>
            </Nav>
            {/* Nav End - 36 */}
          </Navbar>
        </div>
      </header>

      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>

      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
