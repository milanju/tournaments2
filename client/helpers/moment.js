Template.registerHelper('formatDate', function(date) {
  return moment(date).format('LLL');
});

Template.registerHelper('timeUntil', function(date) {
  return moment(date).fromNow();
});
