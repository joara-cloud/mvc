import View from './View.js'

const tag = '[TabView]';

const TabView = Object.create(View);

TabView.setup = function(el) {
  this.init(el);
  this.bindClick();

  return this; // View.js 에서 return this를 해주는거는 여기서만 받을수있고 MainController.js에서 받아야하니깐 this를 리턴!!
}

TabView.setActiveTab = function(tabName) {
  Array.from(this.el.querySelectorAll('li')).forEach(li =>{
    li.className = li.innerHTML === tabName ? 'active' : '';
  })

  this.el.style.display = 'flex'
}

TabView.bindClick = function() {
  
  // [].forEach.call(this.el.querySelectorAll('li'), function(el) { 
  Array.from(this.el.querySelectorAll('li')).forEach(el => { // ES6 Array.from을 쓰면 배열메소드를 사용할수있음
    el.addEventListener('click', () => {
      this.onClick(el.innerHTML)
    })
  })

}

TabView.onClick = function(tabName) {
  this.setActiveTab(tabName);
  this.emit('@change', {tabName}); // 탭이 체인지 됐다는거를 mainController(컨트롤러)에게 알려줘야함 tabview는 탭만 관리하는것이고 탭 아래에 있는 내용은 신경쓰지 않음 그렇게 때문에 탭이 변경됐다는것을 mainController(컨트롤러)에게 알려줌

}

export default TabView;