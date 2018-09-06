import Vue from 'vue';
import ToastComponent from './main.vue';

let instance = null;

const ToastConstructor = Vue.extend(ToastComponent)

const Toast = function(options){
	options = options || {};

	if(typeof options === 'string'){
		options = {
			message: options
		};
	}

	if(instance && !instance.closed){
		instance.close();
		instance = null;
	}

	instance = new ToastConstructor({
		data: options
	});

	instance.vm = instance.$mount();

	document.body.appendChild(instance.$el);
	instance.visible = true;
	instance.dom = instance.vm.$el;

	return instance.vm;
};

['success', 'fail', 'loading'].forEach(name => {
	Toast[ name ] = function(message){
		return Toast({
			message,
			type: name,
			duration: name === 'loading' ? null : 2500
		});
	}
});

Toast.close = function(){
	if(instance){
		instance.close();
	}
}

export default Toast;