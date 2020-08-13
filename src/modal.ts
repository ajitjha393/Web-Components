class Modal extends HTMLElement {
	public isOpen = false
	constructor() {
		super()

		this.attachShadow({ mode: 'open' })
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `

				<style>
					#backdrop {
						position: fixed;
						top: 0;
						left: 0;
						width: 100%;
						height: 100vh;
						background: rgba(0,0,0,0.5);
						z-index: 10;
						display: none;	

					}

					#modal {
						position: fixed;
						top: 10vh;
						left: 25%;
						width: 50%;
						background: white;
						z-index: 100;
						border-radius: 3px;
						box-shadow: 0 2px 8px rgba(0,0,0,0.26);
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						opacity: 0;
						pointer-events: none;
						transition: all 0.3s ease-out;

					}
					:host([opened]) #backdrop
					{
						display: block;
						opacity: 1;
						pointer-events: all;
					} 
					
					:host([opened]) #modal {
						opacity: 1;
						pointer-events: all;
						top: 15vh;
					}

					header {
						padding: 1rem;
						border-bottom: 1px solid #ccc;
					}

					::slotted(h1) {
						font-size: 1.25rem;
						margin: 0;
					}

					#main {
						padding: 1rem;
					}

					#actions {
						border-top: 1px solid #ccc;
						padding: 1rem;
						display: flex;
						justify-content: flex-end;
					}

					#actions button {
						margin: 0 0.25rem;
					}

				</style>

				<div id="backdrop"></div>
				<div id="modal">
					<header>
						<slot name="title">Default Modal Content !</slot>
					</header>	

					<section id="main">
						<slot></slot>
					</section>

					<section id="actions">
						<button id="confirm-btn"> Confirm </button>
						<button id="cancel-btn"> Cancel </button>

					</section>

				</div>

			`
		}

		const confirmButton = this.shadowRoot!.getElementById('confirm-btn')!
		const cancelButton = this.shadowRoot!.getElementById('cancel-btn')!
		const backdrop = this.shadowRoot!.getElementById('backdrop')!

		backdrop.addEventListener('click', this.cancel.bind(this))
		cancelButton.addEventListener('click', this.cancel.bind(this))
		confirmButton.addEventListener('click', this.confirm.bind(this))
	}

	attributeChangedCallback(
		_name: string,
		_oldValue: string,
		_newValue: string
	) {
		if (this.hasAttribute('opened')) {
			this.isOpen = true
		} else {
			this.isOpen = false
		}
	}

	static get observedAttributes() {
		return ['opened']
	}

	public open() {
		this.setAttribute('opened', '')
		this.isOpen = true
	}

	public hide() {
		if (this.hasAttribute('opened')) {
			this.removeAttribute('opened')
		}
		this.isOpen = false
	}

	private cancel(event: Event) {
		this.hide()
		this.dispatchEvent(new Event('cancel'))
	}

	private confirm(event: Event) {
		this.hide()
		// Alternative way to dispatchEvent
		event.target?.dispatchEvent(
			new Event('confirm', { bubbles: true, composed: true })
		)
	}
}

customElements.define('bisu-modal', Modal)
