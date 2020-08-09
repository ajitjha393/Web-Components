class Tooltip extends HTMLElement {
	constructor() {
		super()
		console.log('Tooltip being created!')
	}

	// Whenever we need to access the DOM
	public connectedCallback() {
		const tooltipIcon = document.createElement('span')
		tooltipIcon.textContent = ' (?) '

		tooltipIcon.addEventListener('mouseenter', this.showToolTip.bind(this))
		this.appendChild(tooltipIcon)
	}

	private showToolTip() {
		const tooltipContainer = document.createElement('div')
		tooltipContainer.textContent = 'This a toolTip Content!'
		this.appendChild(tooltipContainer)
	}
}

customElements.define('bisu-tooltip', Tooltip)
