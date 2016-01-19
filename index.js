module.exports = function diff(a, b) {
	return Object.keys(a).concat(Object.keys(b))
		.filter(function(v, i, arr) { return arr.indexOf(v)===i && a[v]!=b[v]; })	// strip dupes & unchanged
		.sort()
		.map(function(key) {
			var ax = a[key] || 0,
				bx = b[key] || 0,
				delta = (bx - ax) / ax;
			return {
				key: key,
				initial: a[key],
				final: b[key],
				difference: bx - ax,
				ratio: bx / ax,
				delta: delta,
				percent: isFinite(delta) ? ((delta * 100).toFixed(2)+'%') : String(delta)
			};
		});
};
