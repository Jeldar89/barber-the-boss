import type { APIRoute } from "astro";
import { getFirestore } from "firebase-admin/firestore";
import { app } from "@/firebase/server";
import type { IEvent } from "@/types/Event";
import dayjs from "dayjs";
export const POST: APIRoute = async ({ request }) => {
    const formData = await request.json();
    const { title, start, end, barber, user } = formData;
  
    if (!title || !start || !end || !barber || !user) {
      return new Response(
        "Missing form data",
        { status: 400 }
      );
    }
  
    const event: IEvent = {
      
      title,
      start: dayjs(start).format("YYYY-MM-DD HH:mm:ss"),
      end: dayjs(end).format("YYYY-MM-DD HH:mm:ss"),
      barber: {
        id: barber},
      user: { id: user} ,
    };
  
    try {
      const db = getFirestore(app);
      const eventsRef = db.collection("events");
      await eventsRef.add({
        title: event.title,
        start: event.start,
        end:  event.end,
        barber: event.barber?.id,
        user: event.user?.id
      });
    } catch (error) {

      return new Response("Something went wrong", {
        status: 500,
      });
    }
  
    return new Response(JSON.stringify(event));
    //return redirect("/services");
  
  }