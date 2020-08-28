import { MongoClient } from "https://deno.land/x/mongo/mod.ts";

const client = new MongoClient();

const cloud =
  "mongodb+srv://adminx1:adminx1@xenyaorin.jwa6i.gcp.mongodb.net/xrefatecore?retryWrites=true&w=majority";

const local = "mongodb://localhost:27017";

client.connectWithUri(cloud);

const db = client.database("xrefatecore");

export default db;
