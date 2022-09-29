export function deepClone(target, key) {
	const obj = Object.create(target || {});
	const curr = target[key];
	if(isObj(curr)) {
		Object.keys(key => {
			// clone prototype
			for(const property in target) {
				obj[key] = property;
			}
		})
	} else {
		const base = isNumber(curr) || isString(curr) || isBool(curr);
		if (base) {
			obj[key] = curr;
		}
	}
	return obj;
}

function isObj(target) {
	return target != null && typeof target == 'object';
}

function isNumber(target) {
	return typeof target == 'number';
}

function isString(target) {
	return typeof target == 'string';
}

function isBool(target) {
	return typeof target == 'boolean';
}