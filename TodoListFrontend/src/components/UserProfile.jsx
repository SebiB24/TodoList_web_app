import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import "./UserProfile.css"

const UserProfile = ({ userData }) => {

    return (
        <div className="profile-card-container">
            <div className="name-section">
                <div className="avatar-container">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <h2 className="user-name">{userData.name}</h2>
            </div>
            <div className="data-section">
                <p className="user-email"><span>Email:</span> {userData.email}</p>
                <p className="user-type"><span>Role:</span> {userData.type}</p>
                <p className="user-score"><span>Score:</span> {userData.score}</p>
            </div>
            <div className="action-section">
                <button className="logout-button">
                    <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                </button>
            </div>
        </div>
    );
}

export default UserProfile;