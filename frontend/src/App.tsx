import { useContext, useEffect } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { Store } from './Store'

function App() {
  const {
    state: { mode: stateMode },
    dispatch,
  } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', stateMode)
  }, [stateMode])

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
              <Button variant={stateMode} onClick={switchModeHandler}>
                <i
                  className={stateMode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                ></i>
              </Button>
              <a href="/cart" className="nav-link">
                Cart
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
