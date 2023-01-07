import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Protected(props) {
    const { Component } = props;
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = JSON.parse(localStorage.getItem('userInfo'));
        if (!isAuthenticated) {
            navigate('/');
        }
    })

    return (
        <div>
            <Component />
        </div>
    )
}
