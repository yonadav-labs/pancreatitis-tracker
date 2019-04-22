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
		console.log('item click: ', e, e.target.value);
		this.props.onClick(e.target.value);
	}

	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle className="btn green-button">
					{this.props.text}
				</DropdownToggle>
				<DropdownMenu className="load-option">
					{
						this.props.data
							? this.props.data.map((item, idx) => (
								<DropdownItem
									key={`history-${idx}`}
									
									value={item.run_at}
									onClick={this.onItemClick}
								>
									{item.run_at}
								</DropdownItem>
							))
							: null
					}
				</DropdownMenu>
			</Dropdown>
		);
	}
}

export default CustomDropdownMenu;