import GET_PHOTO from "../queries/getPhotos";
import { useQuery, NetworkStatus } from "@apollo/client";

const Photos = ({ id }) => {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_PHOTO, {
    variables: { characterId: id },
    notifyOnNetworkStatusChange: true,
  });

  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <br />
      <button onClick={() => refetch({ characterId: 1 })}>
        Fetch Rick photo
      </button>
      <br />
      <br />
      {data.character.image ? (
        <img src={data.character.image} alt='character' />
      ) : null}
    </div>
  );
};

export default Photos;
