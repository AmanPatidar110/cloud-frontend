import { message } from 'antd';
const timeOut = 3;

// Explicit conversion of all Message params to string
const toasts = {
	generateLoading: (loadingMessage = 'Loading...', key = '') => {
		return message.loading({ content: loadingMessage + '', key });
	},
	generateSuccess: (successMessage = '', key = '') => {
		return message.success({ content: successMessage + '', duration: timeOut, key });
	},
	generateError: (errorMessage = '', key = '') => {
		return message.error({ content: errorMessage + '', duration: timeOut, key });
	},
	generateWarning: (warningMessage = '', key = '') => {
		return message.warning({ content: warningMessage + '', duration: timeOut, key });
	},
	generateInformation: (informationMessage = '', key = '') => {
		return message.info({ content: informationMessage, duration: timeOut, key });
	},
};

export default toasts;
