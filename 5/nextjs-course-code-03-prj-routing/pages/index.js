import EventList from "../components/events/event-list";
import { useEffect, useState } from "react";
import useSWR from "swr";

function HomePage(props) {
  const [events, setEvents] = useState(props.events);
  console.log(events);
  const { data, error } = useSWR(
    "https://nestjs-course-default-rtdb.firebaseio.com/events.json"
  );

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

  const featuredEvents = events.filter((event) => event.isFeatured);

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
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

export default HomePage;
