import React from 'react';
import FooterConfirmBox from './components/FooterConfirmBox';
import ServerStatus from './components/ServerStatus';

function withWrapper(WrapComponent) {
	return class extends React.Component {
		constructor(props) {
			super(props);
		}

		_onClick = () => {
			console.log('AAAAAaaaaaaaaaaaaaaaaa-', this.props);
			this.props.changeFooterBoxStatus(false);
		}

		render() {
			const {
				footerConfirmBoxStatus,
				serverStatus,
				isServerError,
				success,
				errorMsg
			} = this.props;
			const additionalClass = footerConfirmBoxStatus ? '' : 'hide';
			if (isServerError) {
				return <ServerStatus isOffline={true} />;
			}

			if (serverStatus && serverStatus.status) {
				return (
					<ServerStatus isOffline={false} />
				);
			}

			if (success === false) {
				const errorMessage = errorMsg ? errorMsg : 'Server Error!';
				return <ServerStatus text={errorMessage} isOffline={true} />;
			}

			if (footerConfirmBoxStatus) {
				return (
					<div className={`hide-wrapper ${additionalClass}`}>
						<div className="hide-wrapper__content">
							<WrapComponent {...this.props} />
						</div>
						<FooterConfirmBox onClick={this._onClick} />
					</div>
				);
			}

			return (<WrapComponent {...this.props} />);
		}
	};
}

export default withWrapper;
