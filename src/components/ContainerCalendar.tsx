import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "dayjs/locale/es";
import type { IService } from "@/types/Services";
import type { IEvent } from "@/types/Event";
import moment from "moment";


export default function ContainerCalendar({ events, services, barber, user }: { events: IEvent[]; services: IService, barber: number|string, user:any }) {
  const [eventsList, setEventsList] = useState(events);
  const [daySelected, setDaySelected] = useState(dayjs(new Date().setHours(0, 0, 0, 0)));
  const [form, setForm] = useState({ title: services.name, start: "", end: "" });

  const culture = ["es"];
  const lang = [
    {
      es: {
        week: 'Semana',
        work_week: 'Semana de trabajo',
        day: 'Día',
        month: 'Mes',
        previous: 'Atrás',
        next: 'Después',
        today: 'Hoy',
        agenda: 'El Diario',

        showMore: (total: any) => `+${total} más`,
      },
    }
  ]

  const clickRef = useRef(0)

  useEffect(() => {

    return () => {
      window.clearTimeout(clickRef?.current)
    }
  }, [])

  const onSelectSlot = useCallback((slotInfo: any) => {
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      setDaySelected(dayjs(slotInfo.start))

    }, 250)
  }, [])

  const validateEvent = useCallback((event: { start: Date, end: Date }) => {
    //daySelected find events that are the same day
    //find events that day Selected
    const eventToDay = eventsList.filter((e: any) => dayjs(e.start).isSame(daySelected, "day"))
    //find if the event is between the start and end of the event
    let isBetween = eventToDay.some((e: any) => {
      return moment(event.start).isBetween(moment(e.start), moment(e.end))
        || moment(event.end).isBetween(moment(e.start), moment(e.end)) ||
        dayjs(e.start).isSame(dayjs(event.start)) || dayjs(e.end).isSame(dayjs(event.end))
    });
    return isBetween
  }, [eventsList])

  // const validateHorario = useCallback((event: { start: Date, end: Date }) => {
  //   //Max 10:00 a 21:00
  //   const max = moment(daySelected.format('YYYY-MM-DD') + '21:00')
  //   const min = moment(daySelected.format('YYYY-MM-DD') + '10:00')

  //   let isBetween = moment(event.start).isBetween(min, max) || moment(event.end).isBetween(min, max)

  //   if (isBetween) {
  //     return true
  //   }

  //   return !isBetween

  // }, [])

  function onChangeTime(e: any) {

    // cambiar el valor del input de start y el de end se actualiza con el valor de start + el service.duration
    const { value } = e.target
    let start = dayjs(daySelected.format('YYYY-MM-DD') + value)
    let end = start.add(services.duration, 'h')
    // if (validateHorario({ start: start.toDate(), end: end.toDate() })) {
    //   alert("El horario no esta disponible")
    //   return
    // }
    if (validateEvent({ start: start.toDate(), end: end.toDate() })) {
      alert("El horario ya esta ocupado")
      return
    }
    setForm({ ...form, start: start.format('HH:mm'), end: end.format('HH:mm') })
  }

  const sendForm = async () => {
    const event: IEvent = {
      title: form.title,
      start: dayjs(daySelected.format('YYYY-MM-DD') + form.start).toDate(),
      end: dayjs(daySelected.format('YYYY-MM-DD') + form.end).toDate(),
      barber: { id: barber },
      user: { id: user.uid }
    }
    try {
      const response = await fetch('/api/events/add.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Event added:', result);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }

  }
  const addEvent = () => {

    const event: IEvent = {
      id: Math.random().toString(),
      title: form.title,
      start: dayjs(daySelected.format('YYYY-MM-DD') + form.start).toDate(),
      end: dayjs(daySelected.format('YYYY-MM-DD') + form.end).toDate(),
      barber: { id: barber }
    }
    sendForm();
    const newEvents = [...eventsList, event]
    setEventsList(newEvents)
    setForm({ title: services.name, start: "", end: "" })
  }

  const localizer = useMemo(() => dayjsLocalizer(dayjs), [])
//console.log(user)
  return (
    <div className="flex flex-wrap justify-between items-center gap-2">
      <div className="w-[40vw] h-[60vh]" title="mount">
        <Calendar
          culture={culture[0]}
          localizer={localizer}
          messages={lang[0].es}
          events={eventsList}
          onSelectSlot={onSelectSlot}
          selectable
          views={["month"]}
        />
      </div>
      <div className="w-[20vw] h-[60vh]">
        <section className="flex flex-col items-start justify-center ">
          <article className="w-full">
            <header>
              <h2 className="p-[10px]  font-bold">
                Selecciona un horario para el servicio:

              </h2>
            </header>
            <form className="flex flex-col items-start justify-center gap-2">
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Servicio </label>
                <input type="text" id="title" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-grey-500 focus:border-gray-500 block w-full p-2.5 " placeholder="title" value={form.title} required disabled />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Inicio</label>
                <input type="time" id="start" min={'09:00'} max={'21:00'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-grey-500 focus:border-gray-500 block w-full p-2.5 " placeholder="start" value={form.start} required onChange={onChangeTime} />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Fin</label>
                <input type="time" id="end" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-grey-500 focus:border-gray-500 block w-full p-2.5 " placeholder="end" value={form.end} required disabled />
              </div>
              <div className="text-center ">
                <span>
                  Tiempo estimado: {" "}
                </span>
                {services.duration} horas
              </div>
              <div className="self-center">
                <button className="bg-gray-950 hover:bg-gray-800 text-white px-12 py-2 text-sm" onClick={addEvent}>Agregar evento</button>
              </div>
            </form>
          </article>
          <article className="w-full">
            <h2 className="p-[10px]  font-bold">
              Eventos del día:{" "}
              <span className=" font-medium">{daySelected.locale('es').format("dddd, D [de] MMMM [de] YYYY")}</span>
            </h2>
            <ul className="overflow-x-auto">
              {eventsList
                .filter((event: any) => dayjs(event.start).isSame(daySelected, "day"))
                .map((event: any) => (
                  <li key={event.id} className="w-full p-2 border">
                    <h5 className="text-lg font-semibold">
                      {event.title}
                    </h5>
                    <span>
                      {event.allDay ? " (Todo el día)" : ` (${dayjs(event.start).format("HH:mm")} - ${dayjs(event.end).format("HH:mm")})`}
                    </span>
                  </li>
                ))}
            </ul>
          </article>
        </section>
      </div>
    </div>
  );
}
