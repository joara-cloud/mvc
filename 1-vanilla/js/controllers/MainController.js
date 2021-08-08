import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';
import KeywordView from '../views/KeywordView.js';

// model
import SearchModel from '../models/SearchModel.js';
import KeywordModel from '../models/KeywordModel.js';

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

		// Result
		ResultView.setup(document.getElementById('searchResult'));
		
		// Tab
		TabView.setup(document.querySelector('#tabs'))
			.on('@change', e => this.onChangeTab(e.detail.tabName))

		this.selectedTab = '추천 검색어';
		this.renderView();
		
	},

	renderView() {
		console.log(tag, 'renderView()');
		TabView.setActiveTab(this.selectedTab);

		if (this.selectedTab === '추천 검색어') {
			this.fetchSearchKeyword(); // 모델에서 데이터를 가져오는 로직이기 때문에 따로 함수를 만들어줌
		} else {

		}

		ResultView.hide();
	},

	fetchSearchKeyword() {
		KeywordModel.list().then(data => {
			KeywordView.render(data);
		})
	},

	search(query) {
		console.log(tag, 'search', query);

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
		ResultView.hide();
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
		this.search(keyword)
	}
}