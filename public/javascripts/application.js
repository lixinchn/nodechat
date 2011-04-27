$(function(){
	_.templateSettings = {
		interpolate: /\{\{(.+?)\}\}/g
	};

	//
	//models
	//
	var ChatEntry = Backbone.Model.extend({
		initialize: function(model){
			this.whom = model.whom;
			this.content = model.content;
		},

		url: '/new'
	});

	var ChatCount = Backbone.Model.extend({
		initialize: function(){
			this.number = 0;
		}
	});


	//
	//collections
	//
	var Chats = Backbone.Collection.extend({
		model: ChatEntry,

		url: '/nodechat.json',

		initialize: function(){
			this.fetch();
		}
	});


	//
	//views
	//
	var ChatCountView = Backbone.View.extend({
		el: $('#client_count'),

		initialize: function(){
			_.bindAll(this, 'render');
			chats.bind('all', this.render);
		},

		render: function(){
			$(this.el).html(this.model.number);
		}
	});

	var ChatEntryView = Backbone.View.extend({
		tagName: 'li', 

		template: _.template("<li class='chat_entry'><p class='whom'>{{whom}}</p><p class='content'>{{content}}</p></li>"),

		initialize: function(){
			_.bindAll(this, 'render');
			this.render();
		},

		render: function(){
			$(this.el).html(this.template({
				whom: this.model.whom,
				content: this.model.content
			}));
			return this;
		}
	});

	var ChatList = Backbone.View.extend({
		el: $('#chat_list'),

		initialize: function(){
			_.bindAll(this, 'render');
			chats.bind('all', this.render);
			this.render();
		},

		render: function(){
			$(this.el).html('');
			for (var i = 0; i < chats.length; i++){
				var model = chats.at(i);
				model = {whom: model.whom, content: model.content};
				var chatEntryView = new ChatEntryView({model: model});
				$(this.el).append(chatEntryView.el);
			}
		}
	});

	var ChatForm = Backbone.View.extend({
		el: $('#chat_form'),

		events: {
			'submit': 'submitForm'
		},

		submitForm: function(e){
			e.preventDefault();

			var whom = $(this.el).find('input[name="whom"]').val(),
				content = $(this.el).find('textarea').val(),
				model = {whom: whom, content: content};
			//var chatEntry = new ChatEntry(model);
			//chatEntry.save();
			if (model = chats.create(model)){
				chats.add(model);
			}
		}
	});

	var NodeChat = Backbone.View.extend({
		el: $('#context'),

		initialize: function(){
			//this.chats = new Chats();
			this.chatList = new ChatList();
			this.chatForm = new ChatForm();
		}
	});

	window.chats = chats = new Chats();
	window.nodeChat = nodeChat = new NodeChat();
});
