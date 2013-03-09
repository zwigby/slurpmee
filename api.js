var request = require('request'),
    util = require('util');

var API = {};

var API_KEY = '12935e50-7d36-11e2-9e96-0800200c9a66';
var URL = 'https://hackatx.appspot.com';

var DEFAULT_RADIUS = 50;

/**
 * Gets all stores based on the latitude, longitude, and radius.
 * @param latitude
 * @param longitude
 * @param radius
 * @param callback
 */
//--------------------------------------------------------------------------------------------------
API.getStores = function(latitude, longitude, radius, callback) {
  if(!callback) {
    callback = radius;
    radius = DEFAULT_RADIUS;
  }
  API._call('/store/search.json', { lat: latitude, lon: longitude, radius: radius }, callback);
};

//--------------------------------------------------------------------------------------------------
API._call = function(route, params, callback) {
  params['api_key'] = API_KEY;

  var url = URL + route + API.genParams(params);

  console.log('Making API request');
  console.log(url);

  request({
    url: url,
    method: 'GET'
  }, function(err, response, body) {

    if(err) {
      return callback(err);
    }
    if(response.statusCode !== 200) {
      return callback(new Error(response.statusCode + ' ' + body));
    }
    return callback(null, body);
  });
};

//--------------------------------------------------------------------------------------------------
API.genParams = function(map) {

  var params = '?';

  for(var key in map) {

    var prefix = (params === '?' ? '' : '&');

    params += prefix + key + '=' + map[key];
  };

  return params;
};

module.exports = API;