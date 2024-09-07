import "../styles/InfoDisplay.css";

function Genre(props) {
  const { genre } = props;
  //I was initially using different data (that required fetching genres in here),
  //hence using separate component for genres
  return (
    <>
      <p className="genre"> {genre} </p>
    </>
  );
}

export default Genre;
