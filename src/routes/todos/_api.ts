import type { Request } from "@sveltejs/kit";

import clientPromise from "$lib/mongodb_client.js";
import { ObjectId } from "mongodb";

export const api = async (request: Request, data?: Record<string, unknown>) => {
  let body = {};
  let status = 500;
  const dbConnection = await clientPromise;
  const db = dbConnection.db("todos");
  const collection = db.collection("tasks");

  switch (request.method.toUpperCase()) {
    case "GET":
      const tasks = await collection.find().toArray();
      body = { tasks };
      status = 200;
      break;
    case "POST":
      const todo = data;
      await collection.insertOne(todo);
      body = await collection.find().toArray();
      status = 201;
      break;
    case "DELETE":
      await collection.deleteOne({ _id: new ObjectId( request.params.uid ) });
      body = await collection.find().toArray();
      status = 200;
      break;
    case "PATCH":
      await collection.updateOne(
        {
          _id: new ObjectId( request.params.uid ) 
        }, {
          $set: { done: data.done }
        }
      );
      body = await collection.find().toArray();
      status = 200;
      break;
    default:
      break;
  }

  if (request.method.toUpperCase() !== "GET"
    && request.headers.accept !== "application/json"
  ) {
    return {
      status: 303,
      headers: {
        location: "/",
      },
    };
  }

  return {
    status,
    body,
  };
};
