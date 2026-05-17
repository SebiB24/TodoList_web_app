import React, { useEffect, useState } from 'react';
import './UserList.css';
import ApiService from "../api/ApiService";
import { UserType } from '../models/User';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus, faUserShield } from '@fortawesome/free-solid-svg-icons';

export const UserListItem = ({ user, onPromote, onRemove }) => {
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
                {user.userType !== UserType.ADMIN && (
                    <div className="user-actions">
                        <button
                            className="btn-action btn-promote"
                            onClick={() => onPromote(user.userId)}
                        >
                            Promote
                        </button>
                        <button
                            className="btn-action btn-remove"
                            onClick={() => onRemove(user.userId)}
                        >
                            Remove
                        </button>
                    </div>
                )}

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

    const onPromote = async (userId) => {
        await ApiService.promoteUser(userId)
        setUpdate(prev => !prev)
        toast.success(`User ${userId} promoted to Admin`, {
            icon: <FontAwesomeIcon icon={faUserShield} style={{ color: '#8b5cf6' }} />,
        });

    }

    const onRemove = async (userId) => {
        await ApiService.removeUser(userId)
        setUpdate(prev => !prev)

        toast.success(`User ${userId} removed`, {
            icon: <FontAwesomeIcon icon={faUserMinus} style={{ color: '#c62828' }} />,
        });
    }

    if (!users || users.length === 0) {
        return <div className="empty-state">No users found.</div>;
    }

    return (
        <div className="user-list-container">
            <h2 className="user-list-title">User Management</h2>

            <div className="user-list">
                {users.map((user, index) => (
                    <UserListItem key={user.email} user={user} onPromote={onPromote} onRemove={onRemove} />
                ))}
            </div>
        </div>
    );
};