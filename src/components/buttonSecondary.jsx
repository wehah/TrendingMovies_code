import "../styles/Buttons.css";
import { InfoCircle } from 'react-bootstrap-icons';

function ButtonSecondary() {
    return (
      <>
        <button className="buttons ButtonSecondary">
     
        <h3  >
        <InfoCircle />
        More info
        </h3>
      
        </button>
      </>
    );
  }
  
  export default ButtonSecondary;