import Cookies from 'js-cookie';

const SCOPE = 'scope';

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

  // A strange problem happen when defines the last key (imisKey) and back to the Pathable side
  // it was overriding the SCOPE cookies, causing us to lose these cookies
  // the solution below merge the current SCOPE cookie and adds the last data from cookie key (imisKey) to use the SCOPE key
  // with this we won't lose the data and be able to complete the process

  const currentCookie = JSON.parse(Cookies.get(SCOPE));

  const newCookies = { ...currentCookie, ...config, credentialToken };

  Cookies.set(SCOPE, JSON.stringify(newCookies));

  OAuth.launchLogin({
    loginService: 'imis',
    loginStyle: 'redirect',
    loginUrl: config.signInUrl,
    credentialRequestCompleteCallback,
    credentialToken,
  });
};
