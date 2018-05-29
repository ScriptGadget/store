'use strict';

module.exports = function(Route) {
  Route.mine = function(cb) {
    var app = Route.app;

    // var entities = {
    //   sites: {
    //       byId: {},
    //       allIds: []
    //     },
    //     machines: {
    //       byId: {},
    //       allIds: []
    //     },
    //     points: {
    //       byId: {},
    //       allIds: []
    //     },
    //     readings: {
    //       byId: {
    //       },
    //       allIds: []
    //     }      
    // };
    
    // app.models.Site.find({}, function(err, sites) {
    //   entities.sites.byId = sites.reduce((result, x) => {
    //     result[x.id] = x;
    //     return result;
    //   }, {});

    //   entities.sites.allIds = Object.keys(entities.sites.byId);
      
    //   app.models.Machine.find({}, function(err, machines) {
    //     entities.machines.byId = machines.reduce((result, x) => {
    //       result[x.id] = x;
    //       return result;
    //     }, {});

    //     entities.machines.allIds = Object.keys(entities.machines.byId);

    //     app.models.Point.find({}, function(err, points) {
    //       entities.points.byId = points.reduce((result, x) => {
    //         result[x.id] = x;
    //         return result;
    //       }, {});

    //       entities.points.allIds = Object.keys(entities.points.byId);

    //       app.models.Reading.find({}, function(err, readings) {
    //         entities.readings.byId = readings.reduce((result, x) => {
    //           result[x.id] = x;
    //           return result;
    //         }, {});

    //         entities.readings.allIds = Object.keys(entities.readings.byId);
                
    //         var response = {entities: entities};
    //         cb(null, response);

    //       });
          
    //     });
                
    //   });
      
    // });
    
    const   sample = {
      entities: {
        sites: {
          byId: {
            '1': {
              id: '1',
              name: 'Markarth',
              location: {lat: 31.8767366, lng: -102.4135945},
              description: "Site of an old Dwemer city."
            },
            '2': {
              id: '2',
              name: 'Riften',
              location: {lat: 35.2021668, lng: -101.9450282},
              description: "Once a bustling trade hub, now a decaying backwater full of thieves."
            },
            '3': {
              id: '3',
              name: 'Riverwood',
              location: {lat: 39.2188492, lng: -121.0887236},
              description: "A beautiful, sleepy mountain village."
            },
          },
          allIds: ['1', '2', '3']
        },
        machines: {
          byId: {
            '5': {
              site: '2',
              id: '5',
              name: 'Water Well',
            },
            '6': {
              site: '2',
              id: '6',
              name: 'Ratway',
            },
            '7': {
              site: '1',
              id: '7',
              name: 'Dwemer Forge',
            },
          },
          allIds: ['5', '6', '7']
        },
        points: {
          byId: {
            '11': {
              machine: '5',
              id: '11',
              name: 'Dipstick',
              unit: 'feet'
            },
            '12': {
              machine: '5',
              id: '12',
              name: 'Salinity Probe',
              unit: 'ppm'
            },
            '13': {
              machine: '7',
              id: '13',
              name: 'Spider Counter',
              unit: 'each'
            },
          },
          allIds: ['11', '12', '13']
        },
        newReadings: {
          byId: {
          },
          allIds: []
        },
        readings: {
          byId: {
            '33' : {
              id: '33',
              point: '13',
              value: '11',
              mark: 1526100200336
            },        
            '32' : {
              id: '32',
              point: '11',
              value: '2.9',
              mark: 1526890286736
            },
            '31' : {
              id: '31',
              point: '11',
              value: '3.0',
              mark: 1526563933068
            },
          },
          allIds: ['33','32','31']
        }
      }
    };

    
    var response = sample;
    cb(null, response);

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
