Imis = {};

Imis.retrieveCredential = (credentialToken, credentialSecret) =>
  OAuth.retrieveCredential(credentialToken, credentialSecret);

OAuth.registerService(
  'imis',
  2,
  null,
  ({ refresh_token: refreshToken, tenantId }) => {
    const config = Imis.getConfiguration({ tenantId });

    const { clientId, secret, imisApiUrl } = config;

    const { data: { access_token: accessToken, userName } = {} } = HTTP.post(
      `${imisApiUrl}/token`,
      {
        params: {
          grant_type: 'refresh_token',
          client_id: clientId,
          client_secret: secret,
          refresh_token: refreshToken,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { data: { Items: items } = {} } = HTTP.get(
      `${imisApiUrl}/api/user?username=${userName}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const user = items?.['$values']?.[0];

    const { PartyId: partyId, ...partyRest } = user?.Party;

    const {
      data: { PersonName: person, Emails: personEmails },
    } = HTTP.get(`${imisApiUrl}/api/party/${partyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const emailsFormatted = personEmails?.['$values']
      ?.map(({ Address: emailAddress }) => emailAddress)
      .join(',');

    delete person['$type'];

    return {
      serviceData: {
        id: user?.UserId,
        accessToken,
        ...person,
      },
      options: {
        profile: { firstName: person?.FirstName, lastName: person?.LastName },
        tenantId,
        email: partyRest?.Email,
        emails: emailsFormatted,
      },
    };
  }
);
