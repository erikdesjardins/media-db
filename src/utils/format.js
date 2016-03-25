import moment from 'moment';
import numeral from 'numeral';

export function formatDate(date) {
	return moment(date).format('YYYY-MM-DD, h:mm a');
}

export function formatNumber(num) {
	return numeral(num).format('0a');
}
