import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from "swr";

function EventDetailPage(props) {
  const [event, setEvents] = useState(props.events[0]);
  const { data, error } = useSWR(
    "https://nestjs-course-default-rtdb.firebaseio.com/events.json"
  );
  useEffect(() => {
    if (data) {
      const transformedEvents = [];

      for (const key in data) {
        if (key === event.id) {
          transformedEvents.push({
            id: key,
            title: data[key].title,
            location: data[key].location,
            description: data[key].description,
            date: data[key].date,
            image: data[key].image,
            isFeatured: data[key].isFeatured,
          });
        }
      }
      setEvents(transformedEvents[0]);
    }
  }, [data]);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const eId = params.eventId;

  const response = await fetch(
    "https://nestjs-course-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const transformedEvents = [];

  for (const key in data) {
    if (key === eId) {
      transformedEvents.push({
        id: key,
        title: data[key].title,
        location: data[key].location,
        description: data[key].description,
        date: data[key].date,
        image: data[key].image,
        isFeatured: data[key].isFeatured,
      });
    }
  }
  return { props: { events: transformedEvents } };
}

export default EventDetailPage;
