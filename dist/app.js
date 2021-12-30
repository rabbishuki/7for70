angular.module("templates",[]);var app=angular.module("app",["ui.router","ngNotify","pascalprecht.translate","templates"]);app.run(["$rootScope","ngNotify",function(t,e){t.$on("$stateChangeError",function(t,e,n,o,r,a){console.error(a)}),e.config({theme:"pure",position:"bottom",duration:3e3,type:"warn",sticky:!1,button:!0,html:!1})}]),app.config(["$translateProvider",function(t){t.useLoader("translateGoogleSheetsLoader",{}),t.preferredLanguage("en"),t.useSanitizeValueStrategy()}]),app.config(["$stateProvider","$urlRouterProvider","$locationProvider","$urlMatcherFactoryProvider",function(t,e,n,o){n.html5Mode(!0),e.rule(function(t,e){e=e.url();if(!("/"===e[e.length-1]||-1<e.indexOf("/?")))return-1<e.indexOf("?")?e.replace("?","/?"):e+"/"}),t.state("app",{abstract:!0,url:"/{lang}/",template:"<sh-app/>",controller:["$translate","$state","$rootScope",function(t,e,n){t.use(e.params.lang),/he|ar/.test(e.params.lang)&&(n.dir="rtl")}]}).state("app.home",{url:"",template:"<sh-main/>"}).state("app.article",{url:"article/{number}/",template:"<sh-articles/>"}),e.otherwise("/en/")}]),app.directive("img",["$parse",function(t){return{restrict:"E",link:function(r,a,l){var s=l.ngError&&t(l.ngError);a.on("error",function(t){var e,n,o=this.src;s&&r.$apply(function(){s(r,{$event:t,$src:o})}),l.ngErrorSrc&&(e=l.ngErrorSrc,n=o.length-e.length,-1===o.indexOf(e,n))&&a.attr("src",l.ngErrorSrc)})}}}]),app.factory("Configuration",["$http","$q","$timeout",function(t,n,e){var o={q:"config.json",data:null};function r(){return t.get(o.q).then(function(t){o.data=t.data})}return{load:r,get:function(e){return n.when(o.data||r()).then(function(t){return o.data[e]})}}}]),angular.module("app").service("googleSheetsService",["$http",function(t){var e,a=this;a.setUrl=function(t){t&&(e="https://sheets.googleapis.com/v4/spreadsheets/"+t+"/values/Sheet1?alt=json&key=AIzaSyDVh0t10vWXoctuhUO00oixlwGXATPNZEM")},a.refresh=function(){a.hasData=!1,a.translations={en:{},he:{},sp:{}},t.get(e).then(function(t){t&&t.data&&t.data.feed&&t.data.feed.entry.length&&(function(t){for(var e in t){var n=t[e].gsx$key.$t,o=t[e].gsx$en.$t,r=t[e].gsx$he.$t,e=t[e].gsx$sp.$t;n&&o&&(a.translations.en[n]=o),n&&r&&(a.translations.he[n]=r),n&&e&&(a.translations.sp[n]=e)}}(t.data.feed.entry),a.hasData=!0)})},a.setUrl("1e29CirEQoQ4nfEHAkKfePMqK4s36TVCS-gPH4psidtw"),a.refresh()}]),angular.module("app").factory("translateGoogleSheetsLoader",["$http","$q",function(t,o){var r,e;return(e="1e29CirEQoQ4nfEHAkKfePMqK4s36TVCS-gPH4psidtw")&&(r="https://sheets.googleapis.com/v4/spreadsheets/"+e+"/values/Sheet1?alt=json&key=AIzaSyDVh0t10vWXoctuhUO00oixlwGXATPNZEM"),function(e){var n=o.defer();return t.get(r).then(function(t){t&&t.data&&t.data.feed&&t.data.feed.entry.length&&n.resolve(function(t,e){if(t[0]["gsx$"+e]){var n,o={};for(n in t){var r=t[n].gsx$key.$t,a=t[n]["gsx$"+e].$t;r&&a&&(o[r]=a)}return o}console.error("Language not available in Google Sheets.")}(t.data.feed.entry,e.key))}),n.promise}}]),app.component("shAbout",{bindings:{},templateUrl:"about/about.html",controller:function(){}}),app.component("shFooter",{bindings:{},templateUrl:"footer/footer.html",controller:function(){}}),app.component("shArticle",{bindings:{},templateUrl:"article/article.html",controller:["$stateParams","$scope","$filter",function(t,e,n){e.n=t.number;var o="image-"+e.n;e.$watch(function(){return n("translate")(o)},function(t){this.showImage=o!==t})}]}),app.component("shLaws",{bindings:{},templateUrl:"laws/laws.html",controller:function(){}}),app.component("shHeader",{bindings:{},templateUrl:"header/header.html",controller:["Configuration","$timeout",function(t,e){var n=this;t.get("imageHeader").then(function(t){n.length=[].constructor(t),e(function(){$(".flexslider").flexslider()},0)})}]}),app.component("shNavbar",{bindings:{},templateUrl:"navbar/navbar.html",controller:["$translate","$state","Configuration",function(e,n,t){var o=this;o.lang=n.params.lang,o.scrollTo=function(t){$("html,body").animate({scrollTop:$(t).offset().top})},o.goTo=function(t){e("sub-nav-id-"+t).then(function(t){n.go("app.article",{number:t})})},o.changeLanguage=function(t){e.use(t),o.lang=t,n.go(".",{lang:t})},t.get("subNav").then(function(t){o.length=[].constructor(t)})}]}),app.component("shRebbe",{bindings:{},templateUrl:"rebbe/rebbe.html",controller:function(){}}),app.component("shSubHeader",{bindings:{},templateUrl:"subHeader/subHeader.html",controller:function(){}}),app.component("shPartners",{bindings:{},templateUrl:"partners/partners.html",controller:["Configuration",function(t){var e=this;t.get("partners").then(function(t){e.length=[].constructor(t)})}]}),app.component("shTopBar",{bindings:{},templateUrl:"topbar/topbar.html",controller:function(){}}),app.component("shArticles",{bindings:{},templateUrl:"articles/articles.html",controller:["$stateParams",function(t){}]}),app.component("shApp",{bindings:{},templateUrl:"app/app.html",controller:["$translate","$state",function(t,e){t.use(e.params.lang)}]}),app.component("shMain",{bindings:{},templateUrl:"main/main.html",controller:function(){}}),app.component("shGoal",{bindings:{},templateUrl:"about/goal/goal.html",controller:function(){}}),app.component("shFb",{bindings:{},templateUrl:"about/fb/fb.html",controller:function(){this.select=function(t){this.selected==t?this.selected=0:this.selected=t}.bind(this)}}),app.component("shSources",{bindings:{},templateUrl:"about/sources/sources.html",controller:function(){}}),app.component("shWho",{bindings:{},templateUrl:"about/who/who.html",controller:function(){}}),app.component("shContact",{bindings:{},templateUrl:"footer/contact/contact.html",controller:function(){}}),app.component("shCopy",{bindings:{},templateUrl:"footer/copy/copy.html",controller:function(){}}),app.component("shForm",{bindings:{},templateUrl:"footer/form/form.html",controller:["$http","ngNotify","$translate",function(e,n,o){this.send=function(t){t&&t.email&&t.name&&t.message?e.post("./contact.php","name="+encodeURIComponent(t.name)+"&message="+encodeURIComponent(t.message)+"&email="+encodeURIComponent(t.email),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){t?n.set(o.instant("mail-success")):n.set(o.instant("mail-error"))}):n.set(o.instant("mail-missing"))},this.form={}}]}),app.component("shLinks",{bindings:{},templateUrl:"footer/links/links.html",controller:function(){}}),app.component("shShare",{bindings:{},templateUrl:"footer/share/share.html",controller:function(){}}),app.component("shMap",{bindings:{},templateUrl:"footer/map/map.html",controller:function(){}});
//# sourceMappingURL=app.js.map
