import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import "./UserProfile.css"
import { useNavigate } from 'react-router-dom'
import ApiService from "../api/ApiService"
import toast from "react-hot-toast"

const UserProfile = ({ userData }) => {

    const navigate = useNavigate()

    const handleLogout = async () => {
        const response = await ApiService.logout()
        navigate('/login')

        toast.success("Logged out successfully", {
            icon: <FontAwesomeIcon icon={faRightFromBracket} style={{ color: '#64748b' }} />,
        });
    }

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
                <button className="logout-button" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                </button>
            </div>
        </div>
    );
}

export default UserProfile;