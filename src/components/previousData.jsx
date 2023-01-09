import GET_PHOTO from "../queries/getPhotos";
import { useQuery } from "@apollo/client";

const PreviousData = ({ id }) => {
  const { loading, error, previousData } = useQuery(GET_PHOTO, {
    variables: { characterId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {previousData?.character?.name ? (
        <>
          <p>Previous: {previousData?.character?.name}</p>
          <img src={previousData?.character?.image} alt='previusImage' />
        </>
      ) : null}
    </div>
  );
};

export default PreviousData;
