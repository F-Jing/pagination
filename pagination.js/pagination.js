const PAGE = {
  data: {
    content: [],
    total: 101,
    pageSize: 10,
    currentPage: 1,
  },
  init: function () {
    this.dataset();
    this.bind();
    this.render();
  },
  bind: function () {
    let pageList = document.getElementById('page-list');
    let pageToggle = document.getElementById('page-section');
    this.onEventListener(pageToggle, 'click', 'previous-page', this.pagePrevious);
    this.onEventListener(pageToggle, 'click', 'first-page', this.pageFirst);
    this.onEventListener(pageToggle, 'click', 'next-page', this.pageNext);
    this.onEventListener(pageToggle, 'click', 'last-page', this.pageLast);
    this.onEventListener(pageToggle, 'click', 'sure-page', this.pageSure)
    this.onEventListener(pageList, 'click', 'page-item', this.listPage);
  },
  onEventListener(parentNode, action, childClassName, callback) {
    parentNode.addEventListener(action, function (e) {
      e.target.className.indexOf(childClassName) >= 0 && callback(e);
    })
  },
  dataset: function () {
    let total = this.data.total;
    let content = this.data.content;
    for (let i = 1; i <= total; i++) {
      content.push(i)
    }
  },
  render: function () {
    let pageSize = this.data.pageSize;
    let currentPage = this.data.currentPage;
    let content = this.data.content;
    let total = this.data.total;
    let contentList = document.getElementById('content-list');
    let pageList = document.getElementById('page-list');
    let pagePresent = document.getElementsByClassName('present-page')[0];
    let showData = function (size, current) {
      pageSize = size;
      currentPage = current;
      let startRow = (currentPage - 1) * pageSize + 1;
      let endRow = currentPage * pageSize;
      for (let i = 1; i < (content.length + 1); i++) {
        let contentElement = content.map(i => {
          return `<li class="content-item" data-index="${i}">${i}</li>`
        }).join('');
        contentList.innerHTML = contentElement;
      }
      for (let i = 1; i < (content.length + 1); i++) {
        let iRow = contentList.childNodes[i - 1];
        let pageFirst = document.getElementsByClassName('first-page')[0];
        let pageLast = document.getElementsByClassName('last-page')[0];
        let pagePrevious = document.getElementsByClassName('previous-page')[0];
        let pageNext = document.getElementsByClassName('next-page')[0];
        if (i >= startRow && i <= endRow && startRow != 1 && i != total) {
          iRow.style.display = ""
          pageFirst.style.color="#000"
          pageLast.style.color="#000"
          pagePrevious.style.color="#000"
          pageNext.style.color="#000"
        }else if(i >= startRow && i <= endRow && startRow == 1){
          iRow.style.display = ""
          pageFirst.style.color="rgba(224,224,224,1)"
          pagePrevious.style.color="rgba(224,224,224,1)"
          pageLast.style.color="#000"
          pageNext.style.color="#000"
        }else if(i>=startRow && i<=endRow && i == total){
          iRow.style.display = ""
          pageLast.style.color="rgba(224,224,224,1)"
          pageNext.style.color="rgba(224,224,224,1)"
          pageFirst.style.color="#000"
          pagePrevious.style.color="#000"
        } else {
          iRow.style.display = "none"
        }
      }
    }
    showData(10, currentPage);
    let jCeil = []
    for (let j = 1; j <= Math.ceil(content.length / 10); j++) {
      jCeil.push(j)
      pageList.innerHTML = jCeil.map(j => {
        return `<li class="page-item ${currentPage == jCeil[j - 1] ? 'active' : ''}" data-index="${j}">${j}</li>`
      }).join('');
    }
    pagePresent.innerHTML = `当前<input class="present-page-number" value="${currentPage}">页`
    for (let j = 1; j <= Math.ceil(content.length / 10); j++) {
      let pRow = pageList.childNodes[j - 1];
      if (j >= currentPage - 1 && j <= currentPage + 1) {
        pRow.style.display = ""
      } else {
        pRow.style.display = "none"
      }
    }
    let pageAll = document.getElementsByClassName('all-page')[0];
    pageAll.innerText = `共 ${Math.ceil(content.length / 10)} 页`
  },
  pageFirst: function () {
    if (PAGE.data.currentPage != 1) {
      PAGE.data.currentPage = 1
    }
    let contentList = document.getElementById('content-list')
    contentList.scrollTo(0, 0)
    PAGE.render();
  },
  pagePrevious: function () {
    if (PAGE.data.currentPage > 1) {
      PAGE.data.currentPage -= 1
    }
    let contentList = document.getElementById('content-list')
    contentList.scrollTo(0, 0)
    PAGE.render();
  },
  listPage: function (e) {
    let pageItem = e.target;
    let index = pageItem.dataset.index;
    PAGE.data.currentPage = Number(index);
    let contentList = document.getElementById('content-list')
    contentList.scrollTo(0, 0)
    PAGE.render();
  },
  pageNext: function () {
    let total = PAGE.data.total
    let pageMax = Math.ceil(total / 10)
    if (PAGE.data.currentPage < pageMax) {
      PAGE.data.currentPage += 1
    }
    let contentList = document.getElementById('content-list')
    contentList.scrollTo(0, 0)
    PAGE.render();
  },
  pageLast: function () {
    let total = PAGE.data.total;
    let pageMax = Math.ceil(total / 10);
    if (PAGE.data.currentPage < pageMax) {
      PAGE.data.currentPage = pageMax;
    }
    let contentList = document.getElementById('content-list')
    contentList.scrollTo(0, 0);
    PAGE.render();
  },
  pageSure: function () {
    let total = PAGE.data.total;
    let pageMax = Math.ceil(total / 10);
    let pageJump = document.getElementsByClassName('present-page-number')[0].value;
    if (pageJump != PAGE.data.currentPage && pageJump <= pageMax) {
      PAGE.data.currentPage = Number(pageJump)
    }
    let contentList = document.getElementById('content-list')
    contentList.scrollTo(0, 0)
    PAGE.render();
  }
}
PAGE.init();