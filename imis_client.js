Imis = {};

Imis.requestCredential = (options, credentialRequestCompleteCallback) => {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    // eslint-disable-next-line no-param-reassign
    credentialRequestCompleteCallback = options;
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  const config = options.config;
  const credentialToken = Random.secret();

  const loginStyle = 'redirect';

  OAuth.launchLogin({
    loginService: 'imis',
    loginStyle,
    loginUrl: config.loginUrl,
    credentialRequestCompleteCallback,
    credentialToken,
  });
};
