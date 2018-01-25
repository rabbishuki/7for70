angular.module("templates",[]);var app=angular.module("app",["ui.router","ngNotify","pascalprecht.translate","templates"]);app.run(["$rootScope","ngNotify",function(t,n){t.$on("$stateChangeError",function(t,n,e,o,r,a){console.error(a)}),n.config({theme:"pure",position:"bottom",duration:3e3,type:"warn",sticky:!1,button:!0,html:!1})}]),app.config(["$translateProvider",function(t){t.useLoader("translateGoogleSheetsLoader",{}),t.preferredLanguage("en"),t.useSanitizeValueStrategy()}]),app.config(["$stateProvider","$urlRouterProvider","$locationProvider","$urlMatcherFactoryProvider",function(t,n,e,o){e.html5Mode(!0),n.rule(function(t,n){var e=n.url();if(!("/"===e[e.length-1]||e.indexOf("/?")>-1))return e.indexOf("?")>-1?e.replace("?","/?"):e+"/"}),t.state("app",{abstract:!0,url:"/{lang}/",template:"<sh-app/>",controller:["$translate","$state","$rootScope",function(t,n,e){t.use(n.params.lang),/he|ar/.test(n.params.lang)&&(e.dir="rtl")}]}).state("app.home",{url:"",template:"<sh-main/>"}).state("app.article",{url:"article/{number}/",template:"<sh-articles/>"}),n.otherwise("/en/")}]),app.directive("img",["$parse",function(t){function n(t,n){var e=t.length-n.length;return-1!==t.indexOf(n,e)}return{restrict:"E",link:function(e,o,r){var a=r.ngError&&t(r.ngError);o.on("error",function(t){var l=this.src;a&&e.$apply(function(){a(e,{$event:t,$src:l})}),r.ngErrorSrc&&!n(l,r.ngErrorSrc)&&o.attr("src",r.ngErrorSrc)})}}}]),app.factory("Configuration",["$http","$q","$timeout",function(t,n,e){function o(){return t.get(r.q).then(function(t){r.data=t.data})}var r={q:"config.json",data:null};return{load:o,get:function(t){return n.when(r.data||o()).then(function(n){return r.data[t]})}}}]),angular.module("app").service("googleSheetsService",["$http",function(t){function n(t){for(var n in t){var e=t[n].gsx$key.$t,r=t[n].gsx$en.$t,a=t[n].gsx$he.$t,l=t[n].gsx$sp.$t;e&&r&&(o.translations.en[e]=r),e&&a&&(o.translations.he[e]=a),e&&l&&(o.translations.sp[e]=l)}}var e,o=this;o.setUrl=function(t){t&&(e="https://spreadsheets.google.com/feeds/list/"+t+"/od6/public/values?alt=json")},o.refresh=function(){o.hasData=!1,o.translations={en:{},he:{},sp:{}},t.get(e).then(function(t){t&&t.data&&t.data.feed&&t.data.feed.entry.length&&(n(t.data.feed.entry),o.hasData=!0)})},o.setUrl("1e29CirEQoQ4nfEHAkKfePMqK4s36TVCS-gPH4psidtw"),o.refresh()}]),angular.module("app").factory("translateGoogleSheetsLoader",["$http","$q",function(t,n){function e(t,n){if(t[0]["gsx$"+n]){var e={};for(var o in t){var r=t[o].gsx$key.$t,a=t[o]["gsx$"+n].$t;r&&a&&(e[r]=a)}return e}console.error("Language not available in Google Sheets.")}var o;return function(t){t&&(o="https://spreadsheets.google.com/feeds/list/"+t+"/od6/public/values?alt=json")}("1e29CirEQoQ4nfEHAkKfePMqK4s36TVCS-gPH4psidtw"),function(r){var a=n.defer();return t.get(o).then(function(t){t&&t.data&&t.data.feed&&t.data.feed.entry.length&&a.resolve(e(t.data.feed.entry,r.key))}),a.promise}}]),app.component("shAbout",{bindings:{},templateUrl:"about/about.html",controller:function(){}}),app.component("shArticle",{bindings:{},templateUrl:"article/article.html",controller:["$stateParams","$scope","$filter",function(t,n,e){n.n=t.number;var o="image-"+n.n;n.$watch(function(){return e("translate")(o)},function(t){this.showImage=o!==t})}]}),app.component("shHeader",{bindings:{},templateUrl:"header/header.html",controller:["Configuration","$timeout",function(t,n){var e=this;t.get("imageHeader").then(function(t){e.length=[].constructor(t),n(function(){$(".flexslider").flexslider()},0)})}]}),app.component("shFooter",{bindings:{},templateUrl:"footer/footer.html",controller:function(){}}),app.component("shLaws",{bindings:{},templateUrl:"laws/laws.html",controller:function(){}}),app.component("shNavbar",{bindings:{},templateUrl:"navbar/navbar.html",controller:["$translate","$state","Configuration",function(t,n,e){var o=this;o.lang=n.params.lang,o.scrollTo=function(t){$("html,body").animate({scrollTop:$(t).offset().top})},o.goTo=function(e){t("sub-nav-id-"+e).then(function(t){n.go("app.article",{number:t})})},o.changeLanguage=function(e){t.use(e),o.lang=e,n.go(".",{lang:e})},e.get("subNav").then(function(t){o.length=[].constructor(t)})}]}),app.component("shPartners",{bindings:{},templateUrl:"partners/partners.html",controller:["Configuration",function(t){var n=this;t.get("partners").then(function(t){n.length=[].constructor(t)})}]}),app.component("shRebbe",{bindings:{},templateUrl:"rebbe/rebbe.html",controller:function(){}}),app.component("shSubHeader",{bindings:{},templateUrl:"subHeader/subHeader.html",controller:function(){}}),app.component("shTopBar",{bindings:{},templateUrl:"topbar/topbar.html",controller:function(){}}),app.component("shApp",{bindings:{},templateUrl:"app/app.html",controller:["$translate","$state",function(t,n){t.use(n.params.lang)}]}),app.component("shArticles",{bindings:{},templateUrl:"articles/articles.html",controller:["$stateParams",function(t){}]}),app.component("shMain",{bindings:{},templateUrl:"main/main.html",controller:function(){}}),app.component("shFb",{bindings:{},templateUrl:"about/fb/fb.html",controller:function(){this.select=function(t){this.selected==t?this.selected=0:this.selected=t}.bind(this)}}),app.component("shGoal",{bindings:{},templateUrl:"about/goal/goal.html",controller:function(){}}),app.component("shSources",{bindings:{},templateUrl:"about/sources/sources.html",controller:function(){}}),app.component("shWho",{bindings:{},templateUrl:"about/who/who.html",controller:function(){}}),app.component("shContact",{bindings:{},templateUrl:"footer/contact/contact.html",controller:function(){}}),app.component("shCopy",{bindings:{},templateUrl:"footer/copy/copy.html",controller:function(){}}),app.component("shForm",{bindings:{},templateUrl:"footer/form/form.html",controller:["$http","ngNotify","$translate",function(t,n,e){this.send=function(o){o&&o.email&&o.name&&o.message?t.post("./contact.php","name="+encodeURIComponent(o.name)+"&message="+encodeURIComponent(o.message)+"&email="+encodeURIComponent(o.email),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){t?n.set(e.instant("mail-success")):n.set(e.instant("mail-error"))}):n.set(e.instant("mail-missing"))},this.form={}}]}),app.component("shLinks",{bindings:{},templateUrl:"footer/links/links.html",controller:function(){}}),app.component("shMap",{bindings:{},templateUrl:"footer/map/map.html",controller:function(){}}),app.component("shShare",{bindings:{},templateUrl:"footer/share/share.html",controller:function(){}});
//# sourceMappingURL=app.js.map