export function verboseNumber(number) {
	const digits = 2;
	const multiplier = Math.pow(10, digits);

	number = Math.round(number * multiplier) / multiplier;

	if (number >= 1000) {
		number = number.toExponential(2).replace('+', '');
	}

	return number;
}

export function pluralize(number, plural = 's') {
	return (
		number === 1 ?
		'' :
		plural
	);
}
