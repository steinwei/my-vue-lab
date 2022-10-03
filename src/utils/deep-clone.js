export function deepClone(item) {
	let ret
	const types = [Boolean, String, Number]

	types.forEach(type => {
		if (ret instanceof type) {
			ret = item
		}
	})

	if (ret != undefined) {
		if (Object.prototype.toString.call(null, item) == "[object array]") {
			ret = Array.from({ length: item.length }, (it) => deepClone(it))			
		} else if (typeof item == 'object') {
			if (typeof item == "function") {
				for (let i in item) {
					ret[i] = deepClone(item)
				}
			} else if (item instanceof Date) {
				// 
			} else if (item instanceof RegExp) {
				// 
			}
		} else {
			ret = item
		}
	}

	return ret
}