import React, { useEffect, useState } from 'react';
import { URL } from '../../utils/config';

const DoctorProfile = ({ doctor }) => {
    if (!doctor) return <p>Loading...</p>;
    return (
        <div className="container my-5 w-100">
            <div className="card p-4 shadow-lg">
                <h1 className="mb-4 text-center text-primary fw-bold">{doctor.name}'s Profile</h1>
                <div className="row">
                    <div className="col-md-6">
                        <p className="lead"><strong>Email:</strong> {doctor.email}</p>
                        <p><strong>Role:</strong> {doctor.role}</p>
                        <p><strong>Gender:</strong> {doctor.gender}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Experience:</strong> {doctor.experiences?.length > 0 ? doctor.experiences.map(e => e.position).join(', ') : 'Not available'}</p>
                        <p><strong>Qualifications:</strong> {doctor.qualifications?.length > 0 ? doctor.qualifications.map(q => q.degree).join(', ') : 'Not available'}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <h4>Reviews</h4>
                    {doctor.reviews?.length > 0 ? (
                        <ul className="list-group">
                            {doctor.reviews.map((review, index) => (
                                <li key={index} className="list-group-item">{review}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const UserProfile = ({ user }) => {
    if (!user) return <p>Loading...</p>;
    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-lg">
                <h1 className="mb-4 text-center text-primary fw-bold">{user.name}'s Profile</h1>
                <div className="row">
                    <div className="col-md-6">
                        <p className="lead"><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Gender:</strong> {user.gender}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Appointments:</strong> {user.appointments?.length > 0 ? user.appointments.join(', ') : 'No appointments'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Profile = () => {
    const [data, setData] = useState(null);
    const token = localStorage.getItem("docToken");
    const id = localStorage.getItem("userId");

    useEffect(() => {
        if (!id || !token) return;
        const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
        async function fetchProfile() {
            try {
                const [res1, res2] = await Promise.all([
                    fetch(URL + "/user/" + id, { headers }),
                    fetch(URL + "/doctor/" + id, { headers })
                ]);
                const [d1, d2] = await Promise.all([res1.json(), res2.json()]);
                if (d1.success) setData(d1);
                else if (d2.success) setData(d2);
            } catch (error) {
                console.error("Error fetching profile", error);
            }
        }
        fetchProfile();
    }, [id, token]);

    return (
        <div>
            {data?.data && data.data.role === "doctor" ? (
                <DoctorProfile doctor={data.data} />
            ) : (
                <UserProfile user={data?.data} />
            )}
        </div>
    );
};

export default Profile;





