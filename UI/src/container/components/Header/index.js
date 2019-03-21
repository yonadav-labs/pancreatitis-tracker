/* disable-eslint no-undef */
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';


class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
		jQuery(document).ready(() => {
			jQuery("#menu-toggle").click((e) => {
				e.preventDefault();
				jQuery("#wrapper").toggleClass("toggled");
			});

			jQuery(window).resize(() =>  {
				if (jQuery(window).width()<=768) {
					jQuery("#wrapper").removeClass("toggled");
				} else {
					jQuery("#wrapper").addClass("toggled");
				}
			});
		});
	}

	render() {
		return (
			<div className="custom-header">
				<nav className="navbar navbar-expand navbar-dark bg-primary custom-navbar">
					<a href="#menu-toggle" id="menu-toggle" className="navbar-brand">
						<span className="navbar-toggler-icon">
						</span>
					</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarsExample02">
						<Link to="/" className="header-logo">ARIEL</Link>
						{/* <ul className="navbar-nav mr-auto">
							<li className="nav-item active"> <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> </li>
							<li className="nav-item"> <a className="nav-link" href="#">Link</a> </li>
						</ul> */}
						<form className="form-inline my-2 my-md-0"> </form>
					</div>
				</nav>
				<div id="wrapper" className="">
					<div id="sidebar-wrapper">
						<span className="close-menu-icon">
							<img src="/assets/images/icons/cross.svg" />
						</span>
						<ul className="sidebar-nav">
							<li className="sidebar-brand">
								<Link to="">User Account</Link>
							</li>
							<li><Link to="">Patient Data</Link></li>
							<li><Link to="">APSC Outputs</Link></li>
							<li><Link to="">Feedback</Link></li>
							<li><Link to="/contact">Contact Us</Link></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;