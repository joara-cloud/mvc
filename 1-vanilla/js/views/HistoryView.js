import KeywordView from './KeywordView.js';

const tag = '[HistroryView]';

const HistroryView = Object.create(KeywordView);

HistroryView.messages.NO_KEYWORDS = '검색 이력이 없습니다.';

HistroryView.getKeywordsHtml = function(data) {

	return data.reduce((html, item) => {
		return html += `<li data-keyword="${item.keyword}">
			${item.keyword}
			<span class="date">${item.date}</span>
			<button type="button" class="btn-remove"></button>
		</li>`

	}, `<ul class="list">`) + '</ul>'

}

HistroryView.bindRemoveBtn = function() {
	Array.from(this.el.querySelectorAll('button.btn-remove')).forEach(btn => {
		btn.addEventListener('click', e => {
			e.stopPropagation(); // 이벤트 버블링 막기 ('이벤트 전파를 막겠어') => 하지않으면 삭제버튼을 클릭했을 때 상위태그인 li태그(검색기록)의 이벤트가 같이 발생함
			this.onRemove(btn.parentElement.dataset.keyword);
		})
	})
}

HistroryView.onRemove = function(keyword) {
	this.emit('@remove', {keyword})
}

export default HistroryView;