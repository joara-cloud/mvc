import View from './View.js';

const tag = '[FormView]';

const FormView = Object.create(View); // View 객체를 복사함

FormView.setup = function(el) { // html element를 주입받아서 내부적으로 소통을 갖게 함
	this.init(el);
	this.inputEl = el.querySelector('[type=text]');
	this.resetEl = el.querySelector('[type=reset]');
	this.showResetBtn(false);
	this.bindEvents();

	return this;
}

FormView.showResetBtn = function(show = true) {
	this.resetEl.style.display = show ? 'block' : 'none'
}

FormView.bindEvents = function() {
	this.on('submit', e => e.preventDefault());
	this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
}

FormView.onKeyup = function(e) {
	const enter = 13;

	this.showResetBtn(this.inputEl.value.length);

	if(e.keyCode !== enter) return;
	// enter일  때 todo
	e.preventDefault();
	this.emit('@submit', {input: this.inputEl.value});
}

export default FormView;