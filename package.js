Package.describe({
  summary: 'Imis OAuth flow',
  version: '1.1.0',
  name: 'pathable:imis-oauth',
  git: 'https://github.com/pathable/imis-oauth',
});

Package.onUse(api => {
  api.versionsFrom('2.3');

  api.use('ecmascript', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', 'server');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.addFiles('imis_client.js', 'client');
  api.addFiles('imis_server.js', 'server');

  api.export('Imis');
});
