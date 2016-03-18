
export function WatchCSSMedia(): {
	addQuery(query: string, callback: Function, transform?: Function): any,
	addQueries(args: any[]): any,
	onWidthGreaterThan(width: string, callback: Function, transform?: Function): any,
	onWidthLessThan(width: string, callback: Function, transform?: Function): any,
	onOrientationChange(callback: Function, transform?: Function): any
};