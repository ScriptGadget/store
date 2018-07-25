module.exports = function(app) {
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  if ( !(process.env.store_user && process.env.store_email && process.env.store_password)) {
    throw "No admin user found.\nusage:\nexport store_user='admin' && export store_email='admin@example.com' && export store_password='example' && node .";
  }
    
  User.create([
    {
      username: process.env.store_user,
      email: process.env.store_email,
      password: process.env.store_password
    }
  ], function(err, users) {
    if (err) throw err;
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) throw err;
      //make an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) throw err;
      });
    });
    
  });
};
