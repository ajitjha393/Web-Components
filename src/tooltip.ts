class Tooltip extends HTMLElement {
	constructor() {
		super()
		console.log('Tooltip being created!')
	}

	// Whenever we need to access the DOM
	connectedCallback() {
		const tooltipIcon = document.createElement('span')
		tooltipIcon.textContent = ' (?) '
		this.appendChild(tooltipIcon)
	}
}

customElements.define('bisu-tooltip', Tooltip)
