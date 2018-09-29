import $ from "jquery";

window.Oxalates = (function() {
  var scrollPositionPattern = new RegExp("^#(\\d+)$");

  var getScrollPosition = function() {
    return $('.content')[0].scrollTop;
  }

  var loadScrollPosition = function() {
    var scrollPositionMatch = scrollPositionPattern.exec(window.location.hash);
    if (scrollPositionMatch) {
      $('.content')[0].scrollTop = parseInt(scrollPositionMatch[1], 10);
    }
  }

  var saveScrollPosition = function(event) {
    window.location.hash = '#'+getScrollPosition();
  };

  var EditList = (function() {
    var editListPathPattern = new RegExp("/lists/([^/]+)/edit");

    var deleteFood = function(event) {
      var $foodListItem = $(event.target).closest('li');
      $foodListItem.remove();
    };

    var sendScrollPosition = function(event) {
      var $done = $('.actions').find('.edit-list');
      var donePath = $done.attr('href');
      donePath = donePath.replace(new RegExp("#.*$"), "");
      donePath += '#'+getScrollPosition();
      $done.attr('href', donePath);
    };

    return {
      isPath: function(path) {
        return editListPathPattern.exec(path);
      },

      setup: function(el) {
        this.$el = $(el);

        var _this = this;
        $(function() {
          loadScrollPosition();
          $('.content').scroll(saveScrollPosition);
          $('.content').scroll(sendScrollPosition);
          $("a.destroy-food-list-item[data-remote]").on("ajax:success", deleteFood);
        });
      }
    };
  })();

  var ShowList = (function() {
    var showListPathPattern = new RegExp("/lists/([^/]+)($|[^/])");

    var sendScrollPosition = function(event) {
      var $done = $('.actions').find('.edit-list');
      var donePath = $done.attr('href');
      donePath = donePath.replace(new RegExp("#.*$"), "");
      donePath += '#'+getScrollPosition();
      $done.attr('href', donePath);
    };

    return {
      isPath: function(path) {
        return showListPathPattern.exec(path);
      },

      setup: function(el) {
        this.$el = $(el);

        var _this = this;
        $(function() {
          loadScrollPosition();
          $('.content').scroll(saveScrollPosition);
          $('.content').scroll(sendScrollPosition);
        });
      }
    };
  })();

  var setupCurrentPath = function(el) {
    var currentPath = document.location.pathname;
    if (EditList.isPath(currentPath)) {
      EditList.setup(el);
    } else if (ShowList.isPath(currentPath)) {
      ShowList.setup(el);
    }
  };

  return {
    setup: function(el) {
      setupCurrentPath(el);
    },

    EditList: EditList,
    ShowList: ShowList
  };
})();

Oxalates.setup(document);
