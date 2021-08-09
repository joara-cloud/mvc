import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';
import KeywordView from '../views/KeywordView.js';
import HistoryView from '../views/HistoryView.js';

// model
import SearchModel from '../models/SearchModel.js';
import KeywordModel from '../models/KeywordModel.js';
import HistoryModel from '../models/HistoryModel.js';
import HistroryView from '../views/HistoryView.js';

const tag = '[MainController]';

export default {
	init() {
		console.log(tag, 'init()');

		// Form
		FormView.setup(document.querySelector('form'))
			.on('@submit', e => this.onSubmit(e.detail.input)) // e.detail.input 은 그냥 e의 속성 중 detail의 input에 입력값이 있기 때문
			.on('@reset', e => this.onResetForm())

		// KeywordView
		KeywordView.setup(document.querySelector('#searchKeyword'))
			.on('@click', e => this.onClickKeyword(e.detail.keyword))

		// HistoryView
		HistoryView.setup(document.querySelector('#searchHistory'))
		.on('@click', e => this.onClickHistory(e.detail.keyword))
		.on('@remove', e => this.onRemoveHistory(e.detail.keyword))

		// Result
		ResultView.setup(document.getElementById('searchResult'));
		
		// Tab
		TabView.setup(document.querySelector('#tabs'))
			.on('@change', e => this.onChangeTab(e.detail.tabName))

		// this.selectedTab = '추천 검색어';
		this.selectedTab = '최근 검색어';
		this.renderView();
		
	},

	renderView() {
		console.log(tag, 'renderView()');
		TabView.setActiveTab(this.selectedTab);

		if (this.selectedTab === '추천 검색어') {
			this.fetchSearchKeyword(); // 모델에서 데이터를 가져오는 로직이기 때문에 따로 함수를 만들어줌
			HistroryView.hide()
		} else {
			this.fetchSearchHistory();
			KeywordView.hide()
		}

		ResultView.hide();
	},

	fetchSearchKeyword() {
		KeywordModel.list().then(data => {
			KeywordView.render(data);
		})
	},

	fetchSearchHistory() {
		HistoryModel.list().then(data => {
			HistoryView.render(data).bindRemoveBtn();
		})
	},

	search(query) {
		console.log(tag, 'search', query);

		FormView.setValue(query);

		// search api
		SearchModel.list(query)
			.then(data => {
				this.onSearchResult(data)
			})
	},

	onSubmit(input) {
		console.log(tag, 'onSubmit()', input);
		this.search(input);
	},

	onResetForm() {
		console.log(tag, 'onResetForm()');
		// ResultView.hide();
		this.renderView();
	},

	onSearchResult(data) {
		TabView.hide();
		KeywordView.hide();
		ResultView.render(data)
	},

	onChangeTab() {
		debugger;
	},

	onClickKeyword(keyword) {
		this.search(keyword);
	},

	onClickHistory(History) {
		this.search(History);
	},

	onRemoveHistory(keyword) {
		HistoryModel.remove(keyword)
		this.renderView();
	}
}