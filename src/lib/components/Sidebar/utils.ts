export function elementIsOverflowing(node: HTMLElement) {
	const curOverflow = node.style.overflow;

	if (!curOverflow || curOverflow === 'visible') node.style.overflow = 'hidden';

	const isOverflowing =
		node.clientWidth < node.scrollWidth || node.clientHeight < node.scrollHeight;
	node.style.overflow = curOverflow;

	return isOverflowing;
}

export function getScrollBarWidth() {
	const inner = document.createElement('p');
	inner.style.width = '100%';
	inner.style.height = '200px';

	const outer = document.createElement('div');
	outer.style.position = 'absolute';
	outer.style.top = '0px';
	outer.style.left = '0px';
	outer.style.visibility = 'hidden';
	outer.style.width = '200px';
	outer.style.height = '150px';
	outer.style.overflow = 'hidden';
	outer.appendChild(inner);

	document.body.appendChild(outer);
	const w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	let w2 = inner.offsetWidth;
	if (w1 == w2) w2 = outer.clientWidth;

	document.body.removeChild(outer);

	return w1 - w2;
}

export function onOverflowChange(element: HTMLElement, callback: (isOverflowing: boolean) => void) {
	const observer = new MutationObserver(() => {
		const isOverflowing = elementIsOverflowing(element);

		callback(isOverflowing);
	});
	observer.observe(element, {
		childList: true,
		subtree: true
	});

	return () => observer.disconnect();
}
