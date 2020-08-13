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
						top: 15vh;
						left: 25%;
						width: 50%;
						background: white;
						z-index: 100;
						border-radius: 3px;
						box-shadow: 0 2px 8px rgba(0,0,0,0.26);
						flex-direction: column;
						justify-content: space-between;
						display: none;

					}
					:host([opened]) #backdrop
					{
						display: block;
					} 
					
					:host([opened]) #modal {
						display: flex;
					}

					header {
						padding: 1rem;
					}

					::slotted(h1) {
						font-size: 1.25rem;
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

	private cancel() {
		this.hide()
	}

	private confirm() {
		this.hide()
	}
}

customElements.define('bisu-modal', Modal)
