class Tooltip extends HTMLElement {
	private tooltipContainer!: HTMLDivElement
	private tooltipText!: string

	// Here i can access normal light Dom and shadowRoot
	constructor() {
		super()
		console.log('Tooltip being created!')
		this.tooltipText = 'Default ToolTip Text!'
		this.attachShadow({ mode: 'open' })

		// Alterantive to using templates
		this.shadowRoot!.innerHTML = `
		<style>

			div {
				font-weight: normal;
				background-color: black;
				color: white;
				position: absolute;
				top: 1.5rem;
				left: 0.75rem;
				z-index: 10;
				padding: 0.15rem;
				border-radius: 3px;
				box-shadow: 1px 1px 6px rgba(0,0,0,0.26)

			}

			:host(.important) {
				background-color: var(--color-primary,#ccc);
				padding: 0.2rem;
			}

			:host-context(p) {
				font-weight: bold;
			}

			::slotted(.highlight) {
				border-bottom: 1px dotted red;
			}

			.icon {
				background: black;
				color: white;
				padding: 0.15rem 0.5rem;
				text-align: center;
				border-radius: 50%;
			} 

		</style>

		<slot>Some Default</slot>
		<span class="icon">?</span>
		`
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

	public attributeChangedCallback(
		name: string,
		oldValue: string,
		newValue: string
	) {
		// console.log(name, oldValue, newValue)
		if (oldValue === newValue) return

		if (name === 'text') {
			this.tooltipText = newValue
		}
	}

	static get observedAttributes() {
		return ['text']
	}

	private showTooltip() {
		this.tooltipContainer = document.createElement('div')
		this.tooltipContainer.textContent = this.tooltipText

		// this.tooltipContainer.style.backgroundColor = 'black'
		// this.tooltipContainer.style.color = 'white'
		// this.tooltipContainer.style.position = 'absolute'
		// this.tooltipContainer.style.zIndex = '10'
		this.shadowRoot!.appendChild(this.tooltipContainer)
	}

	private hideTooltip() {
		this.shadowRoot!.removeChild(this.tooltipContainer)
	}
}

customElements.define('bisu-tooltip', Tooltip)
