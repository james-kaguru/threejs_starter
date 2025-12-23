// deno-lint-ignore-file no-explicit-any
export function createLoggingProxy(target: any, name = "Object") {
	return new Proxy(target, {
		get(target, property, _receiver) {
			const value = target[property];

			// If it's a function, wrap it to log when it's called
			if (typeof value === "function") {
				return function (...args: any[]) {
					console.log(`[${name}] Method called: ${String(property)}`, args);
					const result = value.apply(target, args);
					return result;
				};
			} else {
				console.log(`[${name}] Property accessed: ${String(property)}`);
			}

			return value;
		},

		set(target, property, value) {
			console.log(`[${name}] Property set: ${String(property)} =`, value);
			target[property] = value;
			return true;
		},
	});
}
