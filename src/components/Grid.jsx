import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { ExclamationIcon } from "@heroicons/react/outline";
import Card from "@/components/Card";

const Grid = ({ homes = [] }) => {
  const [favorites, setFavorites] = useState([]);
  const isEmpty = homes?.length === 0;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/user/favorites`);
      setFavorites(data ?? []);
    })();
  }, [favorites]);

  const toggleFavorite = async (id) => {
    if (favorites.some((e) => e.id === id)) {
      axios.delete(`api/homes/${id}/favorite`);
      console.log("delete fav: " + id);
    } else {
      axios.put(`api/homes/${id}/favorite`);
      console.log("add fav: " + id);
    }
  };

  return isEmpty ? (
    <p className="text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
      <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {homes.map((home) => (
        <Card
          {...home}
          key={home.id}
          onClickFavorite={() => toggleFavorite(home.id)}
          favorite={favorites.some((e) => e.id === home.id)}
        />
      ))}
    </div>
  );
};

Grid.propTypes = {
  homes: PropTypes.array,
};

export default Grid;
