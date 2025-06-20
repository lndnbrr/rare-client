/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          <Image src="/images/Rare-logo-only.png" width="70" height="70" alt="Rare Logo" className="rounded-xl" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link className="nav-link" href="/">
              Home
            </Link>
            <Link className="nav-link" href="/posts">
              All Posts
            </Link>
            <Link className="nav-link" href="/posts">
              My Posts
            </Link>
            <Link className="nav-link" href="/users">
              User Manager
            </Link>
            <Link className="nav-link" href="/categories">
              Category Manager
            </Link>
            <Link className="nav-link" href="/tags">
              Tag Manager
            </Link>
            <Link className="nav-link" href={`/users/${user.id}`}>
              My Profile
            </Link>
          </Nav>

          <Button variant="danger" onClick={signOut} href="/">
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
