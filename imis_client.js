import Cookies from 'js-cookie';

const IMIS_CREDENTIALS = 'imisKey';

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

  Cookies.set(IMIS_CREDENTIALS, JSON.stringify({ ...config, credentialToken }));

  OAuth.launchLogin({
    loginService: 'imis',
    loginStyle,
    loginUrl: config.signInUrl,
    credentialRequestCompleteCallback,
    credentialToken,
  });
};
