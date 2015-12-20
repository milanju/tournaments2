Template.registerHelper('equals', function(a, b) {
  return a === b;
});

Template.registerHelper('greaterThan', function(a, b) {
  return a > b;
});

Template.registerHelper('smallerThan', function(a, b) {
  return a < b;
});

Template.registerHelper('minus', function(a, b) {
  return a - b;
});
