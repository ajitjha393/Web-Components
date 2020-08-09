class Tooltip extends HTMLElement {
	private tooltipContainer!: HTMLDivElement

	constructor() {
		super()
		console.log('Tooltip being created!')
	}

	// Whenever we need to access the DOM
	public connectedCallback() {
		const tooltipIcon = document.createElement('span')
		tooltipIcon.textContent = ' (?) '

		tooltipIcon.addEventListener('mouseenter', this.showTooltip.bind(this))
		tooltipIcon.addEventListener('mouseleave', this.hideTooltip.bind(this))

		this.appendChild(tooltipIcon)
	}

	private showTooltip() {
		this.tooltipContainer = document.createElement('div')
		this.tooltipContainer.textContent = 'This a toolTip Content!'
		this.appendChild(this.tooltipContainer)
	}

	private hideTooltip() {
		this.removeChild(this.tooltipContainer)
	}
}

customElements.define('bisu-tooltip', Tooltip)
