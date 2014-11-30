window.Oxalates = (function() {
  var $foodListItems = {};

  var EditList = (function() {
    var editListPathPattern = new RegExp("/lists/(\\d+)/edit");

    var allowEditFoodName = function(event, $el) {
      event.preventDefault();

      // disallow editing of other foods
      hideFields($el);

      // edit this food
      var $editFoodListItem = $(event.target);
      $editFoodListItem.hide();
      $editFoodListItem.siblings('input.food-list-item-name').css('display', 'block').focus();
    };

    var saveList = function(event, $el) {
      event.preventDefault();
      $el.find('form').submit();
    };

    var updateFoodListItem = function(event) {
      var $foodListItemField = $(event.target);
      $foodListItemField.siblings('.edit-food-list-item').text($foodListItemField.val());
    };

    var addSubmitButton = function($el) {
      // Replace "Edit" with "Done"
      var $done = $('<a href="#" class="edit-list"/>');
      $done.text("Done");
      $done.click(function(event) {
        saveList(event, $el);
      });
      $el.find('.actions a.edit-list').replaceWith($done);
    };

    var hideFields = function($el) {
      var $foodListItemFields = $el.find('.food-list-item-name');
      $foodListItemFields.hide();
      $foodListItemFields.siblings('.edit-food-list-item').show();
    };

    return {
      isPath: function(path) {
        return editListPathPattern.exec(path);
      },

      setup: function(el) {
        this.$el = $(el);

        var _this = this;
        this.$el.on('click', '.edit-food-list-item', function(event) {
          allowEditFoodName(event, _this.$el);
        });
        this.$el.on('change', '.food-list-item-name', updateFoodListItem);

        $(function() {
          addSubmitButton(_this.$el);
          hideFields(_this.$el);
        });
      }
    };
  })();

  var setupCurrentPath = function(el) {
    var currentPath = document.location.pathname;
    if (EditList.isPath(currentPath)) {
      EditList.setup(el);
    }
  };

  return {
    setup: function(el) {
      setupCurrentPath(el);
    },

    EditList: EditList
  };
})();

Oxalates.setup(document);
