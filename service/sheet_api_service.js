const { google } = require("googleapis");

const authentication = async function () {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();
  const sheet = google.sheets({
    version: "v4",
    auth: client,
  });
  return { sheet };
};

module.exports = function () {
  this.add({ role: "sheet", cmd: "insert_row" }, insertRow);
  async function insertRow(data, done) {
    const { sheetName, telephoneNumber, fullName, course, content } = data;
    let date = new Date();
    date = date.toISOString().slice(0, 10);
    const sheetId = "15FOPuyB9X_B95Zgt6K86W3lhZasnQlmxnWDFFjOqLbg";
    try {
      const { sheet } = await authentication();
      const rows = await sheet.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: sheetName,
      });
      const arr = rows.data.values;
      //   console.log(arr);
      const id = arr.length.toString();
      const newRecord = [id, telephoneNumber, fullName, course, content, date];
      await sheet.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: sheetName,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [newRecord],
        },
      });
      return done(null, { thongbao: "abcxyz" });
    } catch (error) {
      return done(null, error);
    }
  }
};
