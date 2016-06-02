define([],function(){"use strict";var a={maxTitleCharacters:55,maxDescriptionCharacters:155,maxKeywords:5,keywordsSeparator:",",excerptUrlPrefix:"www.yoursite.com"};return{templates:["/admin/content/template/content/seo"],layout:function(){return{extendExisting:!0,content:{width:"fixed",rightSpace:!0,leftSpace:!0}}},initialize:function(){this.options=this.sandbox.util.extend(!0,{},a,this.options),this.sandbox.emit("sulu.app.ui.reset",{navigation:"small",content:"auto"}),this.sandbox.emit("husky.toolbar.header.item.disable","template",!1),this.title={$el:null,$counter:null},this.description={$el:null,$counter:null},this.keywords={$el:null,$counter:null,count:0},this.formId="#seo-form",this.load(),this.bindCustomEvents(),this.bindDomEvents()},bindCustomEvents:function(){this.sandbox.on("sulu.toolbar.save",function(a){this.submit(a)},this)},bindDomEvents:function(){this.sandbox.dom.on(this.$el,"keyup",this.updateExcerpt.bind(this))},submit:function(a){this.sandbox.logger.log("save Model"),this.sandbox.form.validate(this.formId)&&(this.data.ext.seo=this.sandbox.form.getData(this.formId),this.sandbox.emit("sulu.content.contents.save",this.data,a))},load:function(){this.sandbox.emit("sulu.content.contents.get-data",function(a){this.render(a)}.bind(this))},render:function(a){this.data=a,this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/content/template/content/seo",{siteUrl:this.options.excerptUrlPrefix+"/"+this.options.language+this.data.url})),this.createForm(this.initData(a)),this.listenForChange()},initData:function(a){return a.ext.seo},createForm:function(a){this.sandbox.form.create(this.formId).initialized.then(function(){this.sandbox.form.setData(this.formId,a).then(function(){this.listenForChange(),this.updateExcerpt(),this.initializeTitleCounter(),this.initializeDescriptionCounter(),this.initializeKeywordsCounter()}.bind(this))}.bind(this))},initializeKeywordsCounter:function(){this.keywords.$el=this.$find("#seo-keywords"),this.keywords.$counter=this.$find("#keywords-left"),this.updateKeywordsCounter(),this.sandbox.dom.on(this.keywords.$el,"keyup",this.updateKeywordsCounter.bind(this))},updateExcerpt:function(){this.sandbox.dom.html(this.$find("#seo-excerpt-title"),this.sandbox.dom.val(this.$find("#seo-title"))),this.sandbox.dom.html(this.$find("#seo-excerpt-description"),this.sandbox.dom.val(this.$find("#seo-description")))},initializeTitleCounter:function(){this.title.$el=this.$find("#seo-title"),this.title.$counter=this.$find("#title-left"),this.updateTitleCounter(),this.sandbox.dom.on(this.title.$el,"keyup",this.updateTitleCounter.bind(this))},updateTitleCounter:function(){var a=this.options.maxTitleCharacters-this.sandbox.dom.val(this.title.$el).length;this.sandbox.dom.html(this.title.$counter," "+a+" "),this.toggleWarning(this.title.$counter.parent(),0>=a)},initializeDescriptionCounter:function(){this.description.$el=this.$find("#seo-description"),this.description.$counter=this.$find("#description-left"),this.updateDescriptionCounter(),this.sandbox.dom.on(this.description.$el,"keyup",this.updateDescriptionCounter.bind(this))},updateDescriptionCounter:function(){var a=this.options.maxDescriptionCharacters-this.sandbox.dom.val(this.description.$el).length;this.sandbox.dom.html(this.description.$counter," "+a+" "),this.toggleWarning(this.description.$counter.parent(),0>=a)},updateKeywordsCounter:function(){var a=this.sandbox.dom.trim(this.sandbox.dom.trim(this.sandbox.dom.val(this.keywords.$el)),this.options.keywordsSeparator),b=a.split(this.options.keywordsSeparator),c=this.options.maxKeywords;b=b.filter(function(a){return!!a}),this.keywords.count=b.length,c-=this.keywords.count,this.sandbox.dom.html(this.keywords.$counter,c),this.toggleWarning(this.keywords.$counter.parent(),0>c)},listenForChange:function(){this.sandbox.dom.on(this.formId,"keyup change",function(){this.setHeaderBar(!1)}.bind(this),".trigger-save-button")},setHeaderBar:function(a){this.sandbox.emit("sulu.content.contents.set-header-bar",a)},toggleWarning:function(a,b){b?a.addClass("seo-warning"):a.removeClass("seo-warning")}}});