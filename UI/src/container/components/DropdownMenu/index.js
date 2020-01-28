import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class CustomDropdownMenu extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false
		};
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	onItemClick = (e) => {
		this.props.onClick(e.target.value);
	}

	renderMenuItems = (data) => {
		const res = [];

		for (let idx = 0; idx < data.length; idx++) {
			res.push(
				<DropdownItem
					key={`history-${idx}`}
					value={data[idx].run_at}
					onClick={this.onItemClick}
				>
					{data[idx].run_at}
				</DropdownItem>
			);
		}

		return res;
	}

	renderMenuContent = (data) => {
		const menuItems = this.renderMenuItems(data);
		if (data && data.length > 0) {
			return (<DropdownMenu className="load-option">{menuItems}</DropdownMenu>);
		}

		return;
	}

	render() {
		const menuContent = this.renderMenuContent(this.props.data);
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle className="btn green-button">
					{this.props.text}
				</DropdownToggle>
				{
					this.props.data
						? (
							menuContent
						)
						: null
				}
			</Dropdown>
		);
	}
}

export default CustomDropdownMenu;