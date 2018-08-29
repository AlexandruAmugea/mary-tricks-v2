'use strict';

if (module.hot) {
  module.hot.accept();
}

// Import modules
import 'babel-polyfill';
import '../styles/index.scss';
import angular from 'angular';
import angularroute from 'angular-route';
import instagramSearchDataService from './services/instagramSearchDataService';
import instagramService from './services/instagramFactory';
import mainCtrl from './controllers/mainCtrl';
import galleryCtrl from './controllers/galleryCtrl';
import homeCtrl from './controllers/homeController';
import sliderInstaFeed from './directives/sliderInstaFeed';
import galleryFiltersService from './services/galleryFilters';

// Define the templates 
var homeView = require('raw-loader!./views/home.html');
var contactView = require('raw-loader!./views/contact.html');
var portfolioView = require('raw-loader!./views/portfolio.html');

// Bootstrap the app
var app = angular.module('MaryTricks', [
  "ngRoute"
]);

app.service('instagramSearchDataService', instagramSearchDataService);
app.service('galleryFiltersService', galleryFiltersService);
app.factory('instagramService', instagramService);

app.controller('MainCtrl', mainCtrl);
app.controller('galleryCtrl', galleryCtrl);
app.controller('homeCtrl', homeCtrl);
app.directive('sliderInstaFeed', sliderInstaFeed);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
  $routeProvider
  .when("/", {
      template : homeView
  })
  .when("/contact", {
      template : contactView
  })
  .when("/portfolio", {
      template : portfolioView
  });
}

app.config(config);

