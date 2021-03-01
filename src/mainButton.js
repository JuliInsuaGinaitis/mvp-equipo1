import './mb.css';
function MainButton (props)  {   
    return (
    <div className="mainContainer">
        <p className="title">{props.title}</p>
        <div className="infoContainer">
            {props.children}
        </div>
    </div>
    )
  }

  export default MainButton;