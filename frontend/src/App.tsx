import { useContext, useEffect } from 'react'
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { Store } from './Store'

function App() {
  const {
    state: { mode, cart },
    dispatch,
  } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
    console.log(mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }

  return (
    <div className="d-flex flex-column vh-100">
      <header>
        {/* <Navbar bg="dark" variant="dark" expand="lg"> */}
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand>TSAmazona</Navbar.Brand>
          </Container>
          <div>
            <Nav>
              <Button variant={mode} onClick={switchModeHandler}>
                <i
                  className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                ></i>
              </Button>
              <a href="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce(
                      (a: number, c: any) => a + c.quantity,
                      0
                    )}
                  </Badge>
                )}
              </a>
              <a href="/signin" className="nav-link">
                Sign In
              </a>
            </Nav>
          </div>
        </Navbar>
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
  )
}

export default App
