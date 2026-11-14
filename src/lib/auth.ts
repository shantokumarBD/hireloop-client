import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";

const uri = process.env.MONGODB_URL || "";
const client = new MongoClient(uri);
const db = client.db("hireloop");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  plugins: [admin()],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "seeker",
        input: true,
      },
    },
  },
});
