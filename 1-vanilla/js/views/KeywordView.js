import View from './View.js';

const tag = '[KeywordView]';

const KeywordView = Object.create(View);

KeywordView.messages = {
    NO_KEYWORDS: '추천 검색어가 없습니다.'
};

KeywordView.setup = function(el) {
    this.init(el);

    return this; // KeywordView.js 에서 return this를 해주는거는 여기서만 받을수있고 MainController.js에서 받아야하니깐 this를 리턴!!
}

KeywordView.render = function(data = []) { // 데이터를 받아서 화면에 뿌려줄 함수
    this.el.innerHTML = data.length ? this.getKeywordsHtml(data) : this.messages.NO_KEYWORDS; // 데이터가 있을 경우 or 없을 경우
    this.bindClickEvent();
    this.show();
    return this;
}

KeywordView.getKeywordsHtml = function(data = []) {
    // debugger

    return data.reduce((html, item, index) => {
        html += `<li data-keyword="${item.keyword}">
            <span class="number">${index + 1}</span>
            ${item.keyword}
        </li>`
        return html;
    }, `<ul class="list">`) + '</ul>'
}

KeywordView.bindClickEvent = function() { // click 이벤트를 연결
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', e => {
            this.onClickKeyword(e); // click 했을 때 발생되는 이벤트
        })
    })
}

KeywordView.onClickKeyword = function(e) {
    const {keyword} = e.currentTarget.dataset;
    this.emit('@click', {keyword});
}

KeywordView.addKeyword = function(keyword) {

}

export default KeywordView;