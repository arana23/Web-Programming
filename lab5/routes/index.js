const showsRoutes = require('./shows');
const aboutmeRoutes = require('./aboutme');

const constructorMethod = (app) => {
  app.use('/shows', showsRoutes);
  app.use('/aboutme', aboutmeRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;
