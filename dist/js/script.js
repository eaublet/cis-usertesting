(function() {
  var log;

  log = function(log) {
    return console.log(log);
  };

  $(document).ready(function() {
    return log('toto');
  });

}).call(this);
