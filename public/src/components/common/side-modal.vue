<template>
  <div>
    <div class="custom-modal" id="myModal2" aria-labelledby="myModalLabel2">
			<div class="custom-modal-content">
				<div class="modal-header">
					<button type="button" class="close" @click="closeModal"><span aria-hidden="true">&times;</span></button>
				</div>
				<div class="custom-modal-body">
					<slot></slot>
				</div>
			</div>
	</div>
  </div>
</template>
<script>
  export default {
    name: 'side-modal',
    data: () => ({
      show: false,
    }),
    methods: {
      sideModalOpen() {
        let modal = document.getElementById('myModal2')
        window.onclick = (event) => {
          if (event.target === modal) {
            this.closeModal()
          }
        }
        modal.style.display = 'block'
      },
      closeModal() {
        let modal = document.getElementById('myModal2')
        window.onclick = () => {}
        modal.style.display = 'none'
      },
    },
  }
</script>
<style scoped>
	.custom-modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    right: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	overflow: scroll;
	}

	.custom-modal-content {
    background-color: #fefefe;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
	margin-left: 20%;
	}

	.custom-modal-body {
		height: 100%;
	}

/* The Close Button */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>

