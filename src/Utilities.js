export function verboseNumber(number) {
	number = Math.round(number);

	if (number >= 1000) {
		number = number.toExponential(2).replace('+', '');
	}

	return number;
}
