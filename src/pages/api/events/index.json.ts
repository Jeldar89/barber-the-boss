//export const prerender = true;
import type { APIRoute } from "astro";
import { getFirestore } from "firebase-admin/firestore";
import { app } from "@/firebase/server";
import type { IEvent } from "@/types/Event";

const db = getFirestore(app);
const eventCollection = db.collection("events");
const eventSnapshot = await eventCollection.get();
const events = eventSnapshot.docs.map((doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
  };
}) as IEvent[];

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(events));
};

