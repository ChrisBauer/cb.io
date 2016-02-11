export class Utils {
	static parseFrontEnds (frontEnds, appName) {
		return Object.keys(frontEnds)
			.map(key => { return {key: key, title: frontEnds[key].title, location: frontEnds[key].location}; })
			.sort( (a, b) => {
				if (a.title === appName) {
					return -1;
				}
				if (b.title === appName) {
					return 1;
				}
				return a.title < b.title ? -1 : a.title === b.title ? 0 : 1;
			});
			// .reduce( (acc, el) => {
			// 	acc[el.key] = el;
			// 	delete el.key;
			// 	return acc;
			// }, {});
	}
}	
