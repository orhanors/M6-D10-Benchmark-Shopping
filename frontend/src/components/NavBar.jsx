import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, Dropdown, Button, Container } from "react-bootstrap";
import { getLocalStorage } from "../helpers/localStorage";
import { logout, isAuthenticated } from "../helpers/auth";
const NavBar = (props) => {
	const handleLogout = () => {
		logout(() => {
			props.history.push("/auth/login");
		});
	};
	const showDropDownMenu = () => {
		return (
			<div>
				<Dropdown.Menu>
					{isAuthenticated() ? (
						<>
							<Dropdown.Item as={Link} to='/'>
								Home
							</Dropdown.Item>
							<Dropdown.Item as={Link} to='/products'>
								BackOffice
							</Dropdown.Item>
							<Dropdown.Item as={Link} to='/cart'>
								Cart
							</Dropdown.Item>
							<Dropdown.Item onClick={handleLogout}>
								Logout
							</Dropdown.Item>
						</>
					) : (
						<>
							<Dropdown.Item as={Link} to='/auth/login'>
								Login
							</Dropdown.Item>
							<Dropdown.Item as={Link} to='/auth/signup'>
								Signup
							</Dropdown.Item>
						</>
					)}
				</Dropdown.Menu>
			</div>
		);
	};

	const showDropDown = () => {
		return (
			<div className='dropdown-menu-nav'>
				<Dropdown>
					<Dropdown.Toggle variant='success' as='div'>
						{/* add image */}
					</Dropdown.Toggle>

					<div>{showDropDownMenu()}</div>
				</Dropdown>
			</div>
		);
	};

	return (
		<Navbar style={{ paddingTop: 24 }}>
			<Container>
				<Navbar.Brand as={Link} to='/'>
					<img
						style={{ height: 54 }}
						alt='medium-logo'
						src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Homer.png/389px-Homer.png'
					/>
				</Navbar.Brand>
				<h5 style={{ fontWeight: "bold", marginTop: "0.6em" }}>
					Homeros Shop
				</h5>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<div className='d-flex'>
							{isAuthenticated() && (
								<p className='mr-1'>
									Welcome{" "}
									<strong>
										{getLocalStorage("user")?.name}
									</strong>{" "}
								</p>
							)}
							<div>{showDropDown()}</div>
						</div>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default withRouter(NavBar);
