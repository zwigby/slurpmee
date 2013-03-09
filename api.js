var request = require('request'),
    async = require('async'),
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

  async.waterfall([
    function(callback) {
      API._call('/store/search.json', { lat: latitude, lon: longitude, radius: radius }, callback);
    },
    function(result, callback) {
      API.fillStoreDetails(result, callback);
    },
    function(result, callback) {
      result.content.forEach(function(store) {
        store.distance = API.distance(latitude, longitude,
          store.store_Address.coords.lat, store.store_Address.coords.lon);
      });
      callback(null, result.content);
    }
  ], function(err, result) {
    callback(result);
  });
};

//--------------------------------------------------------------------------------------------------
API.fillStoreDetails = function(stores, callback) {
  var storeIds = [];
  console.log(stores);
  stores.content.forEach(function(store) {
    storeIds.push(store.id);
  });

  var ids = storeIds.join();

  API._call('/store/get_stores_by_id.json', { store_nums: ids }, callback);
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
    body = JSON.parse(body);
    body.content = JSON.parse(body.content);
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

/**
 * Calculates the distance between two GPS coords. Solution from here:
 * http://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
 * @param lat1
 * @param long1
 * @param lat2
 * @param long2
 * @returns {number}
 */
API.distance = function(lat1, long1, lat2, long2) {

  lat1 = parseFloat(lat1);
  long1 = parseFloat(long1);
  lat2 = parseFloat(lat2);
  long2 = parseFloat(long2);

  var d2r = Math.PI / 180;

  var dlong = (long2 - long1) * d2r;
  var dlat = (lat2 - lat1) * d2r;
  var a = Math.pow(Math.sin(dlat/2.0), 2) + Math.cos(lat1*d2r) * Math.cos(lat2*d2r) * Math.pow(Math.sin(dlong/2.0), 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = 3956 * c;

  return d;
};

module.exports = API;