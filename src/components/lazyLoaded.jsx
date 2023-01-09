import GET_PHOTO from "../queries/getPhotos";
import { useLazyQuery } from "@apollo/client";

const LazyLoaded = () => {
  const [getPhoto, { loading, error, data }] = useLazyQuery(GET_PHOTO);

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <button onClick={() => getPhoto({ variables: { characterId: 24 } })}>
        Show me what you got
      </button>
      <br />
      <br />
      {data?.character?.image ? (
        <img src={data?.character?.image} alt='lazyloaded' />
      ) : null}
    </div>
  );
};

export default LazyLoaded;
