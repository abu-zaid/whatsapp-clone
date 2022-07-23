export default function getUser(data) {
  return { type: "SETUSER", payload: data };
}
