import React, { useEffect, useState } from 'react';
import './UserList.css';
import ApiService from "../api/ApiService";

export const UserListItem = ({user}) => {

    return (
        <div className="user-list-item">
            <div className="user-info">
                <h3 className="user-name">{user.name}</h3>
                <span className="user-email">{user.email}</span>
            </div>

            <div className="user-meta">
                <span className={`user-role badge-${user.userType.toLowerCase()}`}>
                    {user.userType}
                </span>
                <span className="user-score">Score: {user.score}</span>
            </div>
        </div>
    );
};


export const UserList = () => {

    const [users, setUsers] = useState([])
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await ApiService.loadUsers()
                if (response) {
                    setUsers(response);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [update]);

    if (!users || users.length === 0) {
        return <div className="empty-state">No users found.</div>;
    }

    return (
        <div className="user-list-container">
            <h2 className="user-list-title">User Management</h2>

            <div className="user-list">
                {users.map((user, index) => (
                    <UserListItem key={user.email} user={user} />
                ))}
            </div>
        </div>
    );
};