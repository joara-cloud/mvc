import View from './View.js';

const tag = '[KeywordView]';

const KeywordView = Object.create(View);

KeywordView.setup = function(el) {
    this.init(el);

    return this; // KeywordView.js 에서 return this를 해주는거는 여기서만 받을수있고 MainController.js에서 받아야하니깐 this를 리턴!!
}

KeywordView.render = function(data = []) { // 데이터를 받아서 화면에 뿌려줄 함수
    this.el.innerHTML = data.length ? this.getKeywordsHtml(data) : '추천 검색어가 없습니다.'; // 데이터가 있을 경우 or 없을 경우
    this.show();
}


KeywordView.getKeywordsHtml = function(data = []) {
    return data.reduce((html, item, index) => {
        html += `<li>
            <span class="number">${index + 1}</span>
            ${item.keyword}
        </li>`
        return html;
    }, '<ul class="list">') + '</ul>'
}

export default KeywordView;