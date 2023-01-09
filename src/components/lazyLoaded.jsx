import GET_PHOTO from "../queries/getPhotos";
import { useLazyQuery } from "@apollo/client";

const LazyLoaded = () => {
  const [getPhoto, { loading, error, data }] = useLazyQuery(GET_PHOTO);

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;

  return (
    <div>
      {data?.character?.image ? (
        <img src={data?.character?.image} alt='lazyloaded' />
      ) : (
        <button onClick={() => getPhoto({ variables: { characterId: 24 } })}>
          Show me what you got
        </button>
      )}
    </div>
  );
};

export default LazyLoaded;
