async function attachResponse(testInfo, name, response) {
  const body = await response.text();

  await testInfo.attach(name, {
    body: JSON.stringify(
      {
        status: response.status(),
        statusText: response.statusText(),
        body
      },
      null,
      2
    ),
    contentType: "application/json"
  });

  return body;
}

module.exports = { attachResponse };
