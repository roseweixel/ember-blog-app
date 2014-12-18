// if you want ember to exist in a single container, use Ember container. Ember.Application.create also takes arguments to use it on only one route.
var IronBlogger = Ember.Application.create();

IronBlogger.ApplicationAdapter = DS.ActiveModelAdapter.extend();

IronBlogger.Router.map(function(){
  this.resource('posts', function(){
    this.resource('post', {path: '/:post_id'})
  });
})

IronBlogger.PostsRoute = Ember.Route.extend({
  model: function(){
    // returns an array-like enumerable object
    return this.store.find('post');
  }
})

IronBlogger.PostController = Ember.ObjectController.extend({
  editing: false,
  actions: {
    startEdit: function(){
      this.set('editing', true)
    },
    savePost: function(){
      var note = this.get('model');
      var controller = this;
      post.save().then(function(){
        controller.set('editing', false)
      })
    },
    deletePost: function(){
      var post = this.get('model');
      var controller = this;
      note.destroyRecord().then(function(){
        controller.transitionToRoute('notes')
      })
    }
  }
})

// IronBlogger.PostRoute = Ember.Route.extend({
//   model: function(params){
//     // returns an array-like enumerable object
//     return this.store.find('post', params.post_id);
//   }
// })

IronBlogger.PostsController = Ember.ArrayController.extend({
  postCount: function(){
    return this.get('model.length');
    // return this.get('model').get('length');
  }.property('model.length') // this makes it give you the value back rather than the function
});

IronBlogger.PostsController = Ember.ArrayController.extend({
  postCount: Ember.computed.alias('model.length')
});


IronBlogger.PostsIndexController = Ember.ArrayController.extend({
  newTitle: '',
  newBody: '',
  newLevelOfRage: '',

  actions: {
    createPost: function(){
      var title = this.get('newTitle');
      var body = this.get('newBody');
      var levelOfRage = this.get('newLevelOfRage');
      //debugger;

      var post = this.store.createRecord('post', {
        title: title,
        body: body,
        levelOfRage: levelOfRage
      });

      post.save()
    }
  }
})

IronBlogger.PostsController = Ember.ArrayController.extend({
  recentPost: function(){
    return this.get('model').sortBy(['updatedAt']).get('lastObject')
    // Watch all of the elements and update it if the updatedAt property changes
  }.property('model.@each.updatedAt')
})

IronBlogger.RecentPostController = Ember.ObjectController.extend({
  prettyTime: function(){
    var updatedAt = this.get('updatedAt');
    return moment(updatedAt).fromNow();
  }.property('model')
})