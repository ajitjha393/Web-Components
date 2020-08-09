class Tooltip extends HTMLElement {
	private tooltipContainer!: HTMLDivElement
	private tooltipText!: string

	constructor() {
		super()
		console.log('Tooltip being created!')
		this.tooltipText = 'Default ToolTip Text!'
	}

	// Whenever we need to access the DOM
	public connectedCallback() {
		if (this.hasAttribute('text')) {
			this.tooltipText = this.getAttribute('text')!
		}

		const tooltipIcon = document.createElement('span')
		tooltipIcon.textContent = ' (?) '

		tooltipIcon.addEventListener('mouseenter', this.showTooltip.bind(this))
		tooltipIcon.addEventListener('mouseleave', this.hideTooltip.bind(this))

		this.appendChild(tooltipIcon)
		this.style.position = 'relative'
	}

	private showTooltip() {
		this.tooltipContainer = document.createElement('div')
		this.tooltipContainer.textContent = this.tooltipText

		this.tooltipContainer.style.backgroundColor = 'black'
		this.tooltipContainer.style.color = 'white'
		this.tooltipContainer.style.position = 'absolute'
		this.tooltipContainer.style.zIndex = '10'
		this.appendChild(this.tooltipContainer)
	}

	private hideTooltip() {
		this.removeChild(this.tooltipContainer)
	}
}

customElements.define('bisu-tooltip', Tooltip)
