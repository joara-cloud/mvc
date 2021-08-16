import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'

new Vue({
  el: '#app', // vue인스턴스가 html의 어느부분에 mount될건지를 설정
  data: {
    query: '', // 입력데이터를 받아서 저장
    searchRestult: [],
    submitted: false,
    tabs: ['추천 검색어', '최근 검색어'],
    selectedTab: '',
    keywords: []
  },
  created() {
    this.selectedTab = this.tabs[0]
    this.fetchKeyword();
  },
  methods: {
    onSubmit: function(e) {
      // debugger;
      this.search();
    },
    onKeyup: function() {
      if(!this.query.length) this.onReset()
    },
    onReset: function() {
      this.query = '';
      this.submitted = false;
      this.searchRestult = []
    },
    search: function() {
      SearchModel.list().then(data => {
        this.submitted = true;
        this.searchRestult = data
      })
    },
    onClickTab: function(tab) {
      // this.selectedTab = this.tabs[clickIndex]
      this.selectedTab = tab
    },
    fetchKeyword: function() {
      KeywordModel.list().then(data => {
        this.keywords = data;
      })
    },
    onClickKeyword: function(keyword) {
      this.query = keyword
      this.search()
    }
  }
})