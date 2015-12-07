Template.tournamentPagination.helpers({
  pagesCount: function() {
    return Math.ceil(Template.instance().data.tournamentsCount / 6);
  },
  currentPage: function() {
    var page = FlowRouter.getParam('page');
    if (page) {
      return page;
    } else {
      return 1;
    }
  },
  active: function(page, currentPage) {
    if (page && page != currentPage) {
      return ''
    } else {
      return 'pagination__btn--active';
    }
  },
  disabled: function(page, currentPage) {
    if (currentPage == page) {
      return 'pagination__btn--disabled';
    } else {
      return '';
    }
  }
});

Template.tournamentPagination.events({
  'click #paginate-left': function(event) {
    event.preventDefault();
    if (event.currentTarget.className.indexOf('pagination__btn--disabled') < 0) {
      var page = parseInt(FlowRouter.getParam('page')) - 1;
      if (!page) {
        page = 0;
      }
      FlowRouter.go('/h/' + page);
    }
  },
  'click #paginate-right': function(event) {
    event.preventDefault();
    if (event.currentTarget.className.indexOf('pagination__btn--disabled') < 0) {
      var page = parseInt(FlowRouter.getParam('page')) + 1;
      if (!page) {
        page = 2;
      }
      FlowRouter.go('/h/' + page);
    }
  },
  'click .pagination__btn': function(event) {
    event.preventDefault();
    var page = event.target.innerHTML;
    FlowRouter.go('/h/' + page);
  },
  'click .pagination__btn--jump': function(event) {
    $('.tournament-pagination__jump').toggle();
  },
  'submit #tournament-pagination__jump__form': function(event) {
    event.preventDefault();
    var page = event.currentTarget[0].value;
    FlowRouter.go('/h/' + page);
    event.currentTarget[0].value = '';
    $('.tournament-pagination__jump').toggle();
  }
});
