class Modal extends HTMLElement {
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
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						display: none;

					}

					header {
						padding: 1rem;
					}

					header h1 {
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
						<h1>Please Confirm !</h1>
					</header>	

					<section id="main">
						<slot></slot>
					</section>

					<section id="actions">
						<button>Okay</button>
						<button>Cancel</button>

					</section>

				</div>

			`
		}
	}

	connectedCallback() {}
}

customElements.define('bisu-modal', Modal)
