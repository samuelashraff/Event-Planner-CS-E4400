import TitleImage from "../assets/Title_Img.png"
import "../styles/TitleComponent.css"

export function TitleComponent() {

    return (
        <>

            <div className="title-container">
                <div className="overlay">
                    <h1 className="overlay-title">Event Planner</h1>
                </div>
                <img src={TitleImage} className="image" alt="Title Image"/>
            </div>
        </>
    )
}