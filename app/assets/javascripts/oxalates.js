window.Oxalates = (function() {
  var setupCurrentPath = function(el) {
    var currentPath = document.location.pathname;
  };

  return {
    setup: function(el) {
      setupCurrentPath(el);
    }
  };
})();

Oxalates.setup(document);
