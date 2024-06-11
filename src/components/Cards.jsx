import "../styles/cards.css";


function Cards(props) {
  const {title, id, image, rating, backDrop, description, onClick, } = props;

  const handleClick = () => {
    onClick(); 
  };



  return (
    <>
    <div className="Cards col-1 " onClick={handleClick}  >
    {id ? ( 
<div >

     {/* <h3>{title}</h3> */}
      <img src={image} alt={id} className="w-100" title={title} key={id} />

      </div>
      ):
      <p>loading</p>
      }
      </div>
    </>
  );
}

export default Cards;
