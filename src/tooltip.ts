class Tooltip extends HTMLElement {
	constructor() {
		super()
		console.log('Tooltip being created!')
	}
}

customElements.define('bisu-tooltip', Tooltip)
