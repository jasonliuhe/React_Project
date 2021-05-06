import { Fragment } from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage(props) {
  const router = useRouter();
  const [events, setEvents] = useState(props.events);
  const { data, error } = useSWR(
    "https://nestjs-course-default-rtdb.firebaseio.com/events.json"
  );

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  useEffect(() => {
    if (data) {
      const transformedEvents = [];

      for (const key in data) {
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
      setEvents(transformedEvents);
    }
  }, [data]);

  if (error) {
    return <p>Error...</p>;
  }

  if (!data && !events) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nestjs-course-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const transformedEvents = [];

  for (const key in data) {
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
  return { props: { events: transformedEvents }, revalidate: 10 };
}

export default AllEventsPage;
