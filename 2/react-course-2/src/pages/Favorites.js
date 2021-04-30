import { useContext } from "react";

import FavoritesContext from "../store/favorites-context";
import MeetupList from "../components/Meetups/MeetupList";

function FaveritesPage() {
  const faveritesCtx = useContext(FavoritesContext);

  let content;

  if (faveritesCtx.totalFavorites === 0) {
    content = <p>You got no favorites yet. Start adding some?</p>;
  } else {
    content = <MeetupList meetups={faveritesCtx.favorites} />;
  }
  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FaveritesPage;
