export default JSONObject;
type JSONObject = { [key: string]: JSONValue };

export type JSONValue = string | number | boolean | JSONObject | Array<JSONValue>;
