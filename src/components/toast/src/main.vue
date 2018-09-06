<template>
	<transition name="toast-fade">
		<div class="toast-wraper" v-show="visible">
			<i v-if="icon" class="toast-icon" :class="{'icon-loading': type==='loading'}"><img :src="icon"></i>
			<div v-if="message" class="toast-message">{{message}}</div>
		</div>
	</transition>
</template>
<script>
	export default {
		data(){
			return {
				visible: false,
				duration: 3000,
				timer: null,
				closed: false,
				icon: null,
				type: null
			}
		},
		mounted(){
			this.setIcon();
			this.startTimer();
		},
		watch: {
			closed(newVal){
				if(newVal){
					this.visible = false;
					this.$el.addEventListener('transitionend', this.destroyElement)
				}
			}
		},
		methods: {
			setIcon(){
				if(this.icon) return;
				if(this.type === 'success') this.icon = require('./assets/fail.svg');
				if(this.type === 'fail') this.icon = require('./assets/success.svg');
				if(this.type === 'loading') this.icon = require('./assets/loading.svg');
			},
			startTimer(){
				if(this.duration === null) return;
				this.timer = setTimeout(() => {
					if(!this.closed){
						this.close();
					}
				}, this.duration);
			},
			clearTimer(){
				clearTimeout(this.timer);
			},
			close(){
				this.closed = true;
			},
			destroyElement(){
				this.$el.removeEventListener('transitionend', this.destroyElement);
				this.$destroy(true);
				this.$el.parentNode.removeChild(this.$el);
			}
		}
	}
</script>
<style scoped>
	.toast-wraper{
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		position: fixed;
		top: 50%;
		left: 50%;
		background: rgba(0,0,0,0.7);
		color: #fff;
		border-radius: 5px;
		padding: 12px;
		transform: translate(-50%, -50%);
		text-align: center;
		pointer-events: none;
	}

	.toast-icon{
		display: inline-block;
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
	.toast-icon img{
		max-width: 100%;
	}
	.toast-message{
		min-width: 81px;
		font-size: 14px;
		line-height: 1.5;
	}
	.toast-fade-enter-active,
	.toast-fade-leave-active{
		transition: all ease-out 0.2s;
	}

	.toast-fade-enter-active{
		opacity: 0;
	}
	.toast-fade-enter-to,
	.toast-fade-leave-active{
		opacity: 1;
	}
	.toast-fade-leave-to{
		opacity: 0;
	}

	@keyframes loading{
		0%{
			transform: rotateZ(0deg);
		}
		100%{
			transform: rotateZ(360deg);
		}
	}

	.icon-loading{
		animation: loading linear 0.8s infinite;
	}
</style>