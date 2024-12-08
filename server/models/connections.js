const createConnections = sequelize => {
  const {User, Token, Topic} = sequelize.models;

  User.hasOne(Token);
  Token.belongsTo(User);

  User.hasMany(Topic);
  Topic.belongsTo(User);
}

module.exports = createConnections;