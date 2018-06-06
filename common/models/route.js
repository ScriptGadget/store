'use strict';

module.exports = function(Route) {
  Route.mine = function(cb) {
    var app = Route.app;

    var entities = {
      sites: {
          byId: {},
          allIds: []
        },
        machines: {
          byId: {},
          allIds: []
        },
        points: {
          byId: {},
          allIds: []
        },
        readings: {
          byId: {
          },
          allIds: []
        }      
    };
    
    app.models.Site.find({}, function(err, sites) {
      entities.sites.byId = sites.reduce((result, x) => {
        result[x.id] = x;
        return result;
      }, {});

      entities.sites.allIds = Object.keys(entities.sites.byId);
      
      app.models.Machine.find({}, function(err, machines) {
        entities.machines.byId = machines.reduce((result, x) => {
          result[x.id] = x;
          return result;
        }, {});

        entities.machines.allIds = Object.keys(entities.machines.byId);

        app.models.Point.find({}, function(err, points) {
          entities.points.byId = points.reduce((result, x) => {
            result[x.id] = x;
            return result;
          }, {});

          entities.points.allIds = Object.keys(entities.points.byId);

          app.models.Reading.find({}, function(err, readings) {
            entities.readings.byId = readings.reduce((result, x) => {
              result[x.id] = x;
              return result;
            }, {});

            entities.readings.allIds = Object.keys(entities.readings.byId);
                
            var response = {entities: entities};
            cb(null, response);

          });
          
        });
                
      });
      
    });

  };
  Route.remoteMethod(
    'mine', {
      http: {
        path: '/mine',
        verb: 'get'
      },
      returns: {
        arg: 'mine',
        type: 'string'
      }
    }
  );
};
