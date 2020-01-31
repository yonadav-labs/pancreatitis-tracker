import React from 'react';
import FooterConfirmBox from './components/FooterConfirmBox';
import ServerStatus from './components/ServerStatus';

function withWrapper(WrapComponent) {
	return class extends React.Component {
		constructor(props) {
			super(props);
		}

		_onClick = () => {
			this.props.changeFooterBoxStatus(false);
		}

		render() {
			const {
				footerConfirmBoxStatus,
				serverStatus,
				isServerError
			} = this.props;
			const additionalClass = footerConfirmBoxStatus ? '' : 'hide';
			if (isServerError) {
				return <ServerStatus isOffline={true} />;
			}

			if (serverStatus && serverStatus.status) {
				return (
					<ServerStatus data={serverStatus} isOffline={false} />
				);
			}

			return (
				<div className={`hide-wrapper ${additionalClass}`}>
					<div className="hide-wrapper__content">
						<WrapComponent {...this.props} />
					</div>
					{ !footerConfirmBoxStatus ? null
						: (
							<FooterConfirmBox onClick={this._onClick} />
						)
					}
				</div>
			);
		}
	};
}

export default withWrapper;
