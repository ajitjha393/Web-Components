class Tooltip extends HTMLElement {
	private tooltipContainer!: HTMLDivElement
	private tooltipText!: string

	// Here i can access normal light Dom and shadowRoot
	constructor() {
		super()
		console.log('Tooltip being created!')
		this.tooltipText = 'Default ToolTip Text!'
		this.attachShadow({ mode: 'open' })
		// const toolTipTemplate = document.querySelector(
		// 	'#tooltip-template'
		// ) as HTMLTemplateElement

		// this.shadowRoot?.appendChild(toolTipTemplate.content.cloneNode(true))
		// Alterantive to using templates
		this.shadowRoot!.innerHTML = `<slot></slot><span> (?) </span>`
	}

	// Whenever we need to access the DOM
	public connectedCallback() {
		if (this.hasAttribute('text')) {
			this.tooltipText = this.getAttribute('text')!
		}

		const tooltipIcon = this.shadowRoot!.querySelector('span')!

		tooltipIcon.addEventListener('mouseenter', this.showTooltip.bind(this))
		tooltipIcon.addEventListener('mouseleave', this.hideTooltip.bind(this))

		this.style.position = 'relative'
		this.shadowRoot!.appendChild(tooltipIcon)
	}

	private showTooltip() {
		this.tooltipContainer = document.createElement('div')
		this.tooltipContainer.textContent = this.tooltipText

		this.tooltipContainer.style.backgroundColor = 'black'
		this.tooltipContainer.style.color = 'white'
		this.tooltipContainer.style.position = 'absolute'
		this.tooltipContainer.style.zIndex = '10'
		this.shadowRoot!.appendChild(this.tooltipContainer)
	}

	private hideTooltip() {
		this.shadowRoot!.removeChild(this.tooltipContainer)
	}
}

customElements.define('bisu-tooltip', Tooltip)
