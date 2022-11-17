import React, { FC, ReactNode } from 'react'
import { Navbar, Container, NavbarBrand } from 'react-bootstrap'

type PropType = {
  children: ReactNode
}

export const MainLayout: FC<PropType> = ({ children }) => (
  <>
    <Navbar bg="light" expand="lg">
      <Container>
        <NavbarBrand>React dogs app</NavbarBrand>
      </Container>
    </Navbar>
    <main className="pt-5">
      <Container>{children}</Container>
    </main>
  </>
)
