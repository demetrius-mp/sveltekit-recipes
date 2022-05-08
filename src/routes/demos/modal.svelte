<script lang="ts">
	import { Modal, ModalDialog } from '$lib/components/Modal';

	let isOpen: boolean = false;
	function toggleIsOpen() {
		isOpen = !isOpen;
	}
</script>

<Modal bind:isOpen>
	<ModalDialog>
		<div class="modal-header">
			<h5 class="modal-title">Modal title</h5>
			<button type="button" class="btn-close" on:click={toggleIsOpen} />
		</div>
		<div class="modal-body">Woohoo, you're reading this text in a modal!</div>
		<div class="modal-footer">
			<button type="button" on:click={toggleIsOpen} class="btn btn-secondary">Close</button>
			<button type="button" class="btn btn-primary">Save changes</button>
		</div>
	</ModalDialog>
</Modal>

<div class="container mt-5 text-center">
	<button on:click={toggleIsOpen} class="btn btn-primary"> Open modal </button>
</div>
