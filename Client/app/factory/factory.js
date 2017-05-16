app.factory('Page', function() {
	this.title = 'default';
   return {
     title: function() { return this.title; },
     setTitle: function(newTitle) { this.title = newTitle }
   };
});