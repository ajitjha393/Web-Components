class ConfirmLink extends HTMLAnchorElement {
	constructor() {
		super()
	}

	connectedCallback() {
		this.addEventListener('click', event => {
			if (!confirm('Do you really want to be redirected ?')) {
				event.preventDefault()
			}
		})
	}
}

customElements.define('bisu-confirm-link', ConfirmLink, { extends: 'a' })
