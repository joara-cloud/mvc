import View from './View.js'

const tag = '[ResultView]'

const ResultView = Object.create(View)

ResultView.messages = {
  NO_RESULT: '검색 결과가 없습니다'
}

ResultView.setup = function (el) {
  this.init(el)

  return this;
}

ResultView.render = function (data = []) {
  console.log(tag, 'render()', data)
  this.el.innerHTML = data.length ? this.getSearchResultsHtml(data) : this.messages.NO_RESULT
  this.show()
}


ResultView.getSearchResultHtml = function(data) {
  // debugger;
  return data.reduce((html, item) => {
    html += this.getSearchResultItemHtml(item)
    return html;
  }, '<ul class="result_list">') + '</ul>'
}

ResultView.getSearchResultItemHtml = function(item) {
  return `<li>
            <div class="thumb"><img src="${item.image}" alt=""></div>
            <p class="info">${item.name}</p>
          </li>`;
}

ResultView.clearData = function(item) {
  
}

export default ResultView