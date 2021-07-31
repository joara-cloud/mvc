import View from './View.js';

var tag = '[FormView]';

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
	this.resetEl.addEventListener('click', e =>  this.onClickReset(e))
}

FormView.onKeyup = function(e) {
	const enter = 13;

	this.showResetBtn(this.inputEl.value.length);

	if(!this.inputEl.value.length) this.emit('@reset')

	if(e.keyCode !== enter) return;
	// enter일  때 todo
	e.preventDefault();
	this.emit('@submit', {input: this.inputEl.value}); // 이벤트가 발생했다는 것만 알려주면 됨 (결과를 보여주는거는 다른 view(ResultView)에서 진행)

}

FormView.onClickReset = function(e) {
	this.emit('@reset') // controller에 reset이라는 이벤트를 전달
	this.showResetBtn(false)
}

export default FormView;