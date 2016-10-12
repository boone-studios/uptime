!function(){"use strict";angular.module("uptime",["ngSanitize","ui.router","templates"]).run(["$rootScope","$state","$uiRouter","$transitions",function(t,e,o,n){}])}(),function(){"use strict";angular.module("uptime").service("ConfigService",["$http",function(t){var e={},o=t.get("config.json").then(function(t){console.log("Loading configuration file..."),e=angular.fromJson(t.data)},function(t){console.error(t)});return{promise:o,getConfig:function(){return e}}}])}(),function(){"use strict";angular.module("uptime").controller("AppController",["$scope","ConfigService",function(t,e){e.promise.then(function(){t.brand=e.getConfig().brand_raw})}])}(),function(){"use strict";angular.module("uptime").component("homePageComponent",{bindings:{dashboard:"<"},templateUrl:"HomePage/home.html"})}(),function(){"use strict";angular.module("uptime").component("listElementComponent",{bindings:{},templateUrl:"WebsiteList/list_element.html",controller:["$scope","$http",function(t,e){this.statuses=[],this.sites=[{title:"Boone Software",url:"https://boone.io",method:"GET",status:"online",text:"Online"},{title:"2 Cool Percussion",url:"http://2coolpercussion.com",method:"GET",status:"error",text:"404 Not Found"}],angular.forEach(this.sites,function(t,o){({data:t,headers:{"Content-Type":"application/json"},method:t.method,url:"/status"});e.get("/status",{params:{data:t}}).then(function(t){console.log(t)},function(t){console.error(t)})})}]})}(),function(){"use strict";angular.module("uptime").component("statusElementComponent",{bindings:{status:"<",text:"<"},templateUrl:"WebsiteList/status_element.html",controller:[function(t){}]})}(),function(){"use strict";angular.module("uptime").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(t,e,o){o.html5Mode(!0),e.otherwise("/"),t.state("app",{abstract:!0,templateUrl:"App/app_wrapper.html"}).state("app.home",{url:"/",component:"homePageComponent"})}])}();
//# sourceMappingURL=app.js.map
