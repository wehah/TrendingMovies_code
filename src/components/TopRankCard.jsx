
import "../styles/TopRankCard.css";

function TopRankCard({ style }) {
    return (
      <>
      <div style = {style} className="TopRankCard" >
        <h3 >Top <br/> 10</h3>
        <h2>Top rated content</h2>
        </div>
      </>
    );
  }
  
  export default TopRankCard;