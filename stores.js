var Stores = {};

Stores.filter = function(stores) {
  var flavors = {};
  if(!stores.hasOwnProperty('length') || !stores[0].flavors.hasOwnProperty('length')) {
    console.log('no stores or flavors');
    return;
  }
  for (var i = 0; i < stores.length; i++) {
    var store = stores[i];
    for (var j = 0; j < store.flavors.length; j++) {
      var flavor = store.flavors[j];
      if(flavors.hasOwnProperty(flavor)) {
        if(store.distance < flavors[flavor].distance) {
          flavors[flavor] = {
            id : flavor,
            name : flavor.replace('_',' '),
            lat : store.store_Address.coords.lat,
            lon : store.store_Address.coords.lon,
            distance : store.distance
          };
        }
      } else {
        flavors[flavor] = {
          id : flavor,
          name : flavor.replace('_',' '),
          lat : store.store_Address.coords.lat,
          lon : store.store_Address.coords.lon,
          distance : store.distance
        };
      }
    }
  }
  var retval = [];
  for(var n in flavors) {
    retval.push(flavors[n]);
  }
  retval.sort(function(a,b){return a.distance-b.distance});
  return retval;
};

module.exports = Stores;