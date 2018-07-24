/**
 * @method extractName
 * @summary returns a name while user has not completed details.
 * @return {String} - temporary display name.
 */
export default function extractName(email) {
  if (email.indexOf(".") !== -1 && (email.indexOf(".") < email.indexOf("@"))) {
    return email.substring(0, email.indexOf("."));
  }
  return email.substring(0, email.indexOf("@"));
}
