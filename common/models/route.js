'use strict';

module.exports = function(Route) {
  Route.mine = function(options, cb) {
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

    if (options  && options.accessToken && options.accessToken.userId) {

      // We already have The Technician's ID
      // Find the Route. A Technician can only have one.
      Route.findOne({where: {technicianId: options.accessToken.userId}}, function(err, route) {
        if (route && route.id) {

          // Get all of this Sites on this Route
          route.sites({}, function(err, sites) {
            entities.sites.byId = sites.reduce((result, x) => {
              result[x.id] = x;
              return result;
            }, {});

            entities.sites.allIds = Object.keys(entities.sites.byId);

            // Get the Machines at Sites owned by this Route
            app.models.Machine.find({where: {siteId: {inq: entities.sites.allIds} }}, function(err, machines) {
              entities.machines.byId = machines.reduce((result, x) => {
                result[x.id] = x;
                return result;
              }, {});

              entities.machines.allIds = Object.keys(entities.machines.byId);

              // Get all Measurement Points for Machines on this Route
              app.models.Point.find({where: {machineId: {inq: entities.machines.allIds}}}, function(err, points) {
                entities.points.byId = points.reduce((result, x) => {
                  result[x.id] = x;
                  return result;
                }, {});

                entities.points.allIds = Object.keys(entities.points.byId);

                // Get all Readings for Measurement Points on this Route
                app.models.Reading.find({where: {pointId: {inq: entities.points.allIds}}}, function(err, readings) {
                  entities.readings.byId = readings.reduce((result, x) => {
                    result[x.id] = x;
                    return result;
                  }, {});

                  entities.readings.allIds = Object.keys(entities.readings.byId);

                  cb(null, {entities: entities});

                }); // Readings
              }); // Points
            }); // Machines
          }); // Sites
        } // if route
        else
        {
          cb(null, {entities: entities});
        }
      }); // Route
    }
    else
    {
      var error = new Error("You must be authenticated to call this method.");
      error.status = 401;
      cb(error);
    }
  };

  Route.remoteMethod(
    'mine', {
      http: {
        path: '/mine',
        verb: 'get'
      },
      accepts: [
        { arg: "options", type: "object", http: "optionsFromRequest" },
      ],
      returns: {
        arg: 'mine',
        type: 'string'
      }
    }
  );
};
