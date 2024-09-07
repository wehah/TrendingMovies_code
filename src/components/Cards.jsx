import "../styles/cards.css";

function Cards(props) {
  const { title, id, image, rating, backDrop, description, onClick } = props;

  const handleClick = () => {
    onClick();
  };

  return (
    <>
      <div className="imgCard col-2 " onClick={handleClick}>
        {id ? (
          <img src={image} alt={id} className="w-100" title={title} key={id} />
        ) : (
          <p>loading</p>
        )}
      </div>
    </>
  );
}

export default Cards;
