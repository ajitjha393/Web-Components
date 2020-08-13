class Modal extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: 'open' })
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
			
				<div id="backdrop"></div>
				<div id="modal"></div>

			`
		}
	}

	connectedCallback() {}
}

customElements.define('bisu-modal', Modal)
