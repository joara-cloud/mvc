import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';

// model
import SearchModel from '../models/SearchModel.js';

const tag = '[MainController]';

export default {
	init() {
		console.log(tag, 'init()');

		// Form
		FormView.setup(document.querySelector('form'))
			.on('@submit', e => this.onSubmit(e.detail.input)) // e.detail.input 은 그냥 e의 속성 중 detail의 input에 입력값이 있기 때문
			.on('@reset', e => this.onResetForm())

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
		ResultView.hide();
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
		ResultView.render(data)
	},

	onChangeTab() {
		debugger;
	}
}