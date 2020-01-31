import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)'
	}
};


class CustomModal extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {modalIsOpen, closeModal, openModal} = this.props;
		const title = this.props.title ? this.props.title : 'Are you sure you want to clear all data?';
		const submitText = this.props.submitText ? this.props.submitText : 'Yes';
		const closeText = this.props.closeText ? this.props.closeText : 'No';
		return (
			<div>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel="Confirm Modal"
					ariaHideApp={false}
				>

					<h2>{title}</h2>
					<div className="p-3 d-flex">
						<div className="m-auto">
							<button
								className="mr-3 btn-modal"
								onClick={this.props.submitAction}
							>
								{submitText}
							</button>
							<button
								className="btn-modal cancel"
								onClick={closeModal}
							>
								{closeText}
							</button>
						</div>
					</div>
					
				</Modal>
			</div>
		);
	}
}

CustomModal.propTypes = {
	submitAction: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	title: PropTypes.string,
	submitText: PropTypes.string,
	closeText: PropTypes.string
};

export default CustomModal;