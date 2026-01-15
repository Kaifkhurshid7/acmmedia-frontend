import React, { useState, useEffect, useContext } from 'react';
import { createPost } from '../api/posts';
import { createEvent } from '../api/events';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [postData, setPostData] = useState({ title: '', content: '' });
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        registrationLink: ''
    });

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Protect admin route
    useEffect(() => {
        if (!user) navigate('/login');
        else if (user.role !== 'admin') navigate('/');
    }, [user, navigate]);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            await createPost(postData);
            alert('Post created successfully!');
            setPostData({ title: '', content: '' });
        } catch (err) {
            alert('Failed to create post.');
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            await createEvent(eventData);
            alert('Event created successfully!');
            setEventData({
                title: '',
                description: '',
                date: '',
                location: '',
                registrationLink: ''
            });
        } catch (err) {
            alert('Failed to create event.');
        }
    };

    return (
        <div className="admin-page">

            {/* HEADER */}
            <header className="admin-header">
                <h1>Admin Control Panel</h1>
                <p>
                    Welcome to the <strong>ACM-XIM-ENVOY</strong> administration dashboard.
                    From here, administrators can publish official chapter news, manage
                    events, and monitor engagement across the AntiGravity platform.
                </p>
            </header>

            {/* MAIN ACTIONS */}
            <section className="admin-actions">

                {/* CREATE POST */}
                <div className="admin-card">
                    <h2>Publish Chapter News</h2>
                    <p>
                        Create official announcements, achievements, notices, and
                        updates that will appear on the main feed for all members.
                    </p>

                    <form onSubmit={handleCreatePost}>
                        <input
                            type="text"
                            placeholder="News Title"
                            value={postData.title}
                            onChange={(e) =>
                                setPostData({ ...postData, title: e.target.value })
                            }
                            required
                        />

                        <textarea
                            placeholder="Write detailed news content here..."
                            value={postData.content}
                            onChange={(e) =>
                                setPostData({ ...postData, content: e.target.value })
                            }
                            required
                        />

                        <button type="submit">
                            Publish News
                        </button>
                    </form>
                </div>

                {/* CREATE EVENT */}
                <div className="admin-card">
                    <h2>Create & Schedule Event</h2>
                    <p>
                        Add upcoming workshops, hackathons, seminars, or competitions.
                        These events will be visible to all registered users.
                    </p>

                    <form onSubmit={handleCreateEvent}>
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={eventData.title}
                            onChange={(e) =>
                                setEventData({ ...eventData, title: e.target.value })
                            }
                            required
                        />

                        <input
                            type="date"
                            value={eventData.date}
                            onChange={(e) =>
                                setEventData({ ...eventData, date: e.target.value })
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Event Location / Mode (Online / Offline)"
                            value={eventData.location}
                            onChange={(e) =>
                                setEventData({ ...eventData, location: e.target.value })
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Registration Link (optional)"
                            value={eventData.registrationLink}
                            onChange={(e) =>
                                setEventData({
                                    ...eventData,
                                    registrationLink: e.target.value
                                })
                            }
                        />

                        <textarea
                            placeholder="Describe agenda, speakers, eligibility, and details..."
                            value={eventData.description}
                            onChange={(e) =>
                                setEventData({
                                    ...eventData,
                                    description: e.target.value
                                })
                            }
                            required
                        />

                        <button type="submit">
                            Add Event
                        </button>
                    </form>
                </div>
            </section>

            {/* CONTENT MANAGEMENT INFO */}
            <section className="admin-info">
                <h2>Content Moderation & Management</h2>
                <p>
                    Administrators have extended privileges across the platform.
                    You can manage posts, remove inappropriate content, and moderate
                    discussions directly from the main feed.
                </p>

                <button
                    className="admin-btn-outline"
                    onClick={() => navigate('/')}
                >
                    ← Go to Main Feed
                </button>
            </section>

            {/* ANALYTICS */}
            <section className="admin-analytics">
                <h2>Platform Insights & Overview</h2>
                <p>
                    A high-level overview of platform engagement and user activity.
                    (Static preview – can be connected to real analytics later.)
                </p>

                <div className="analytics-grid">
                    <div className="analytics-card">
                        <h4>User Engagement</h4>
                        <p>👍 Likes: 120+</p>
                        <p>💬 Comments: 45+</p>
                        <p>📰 Posts Published: 30+</p>
                    </div>

                    <div className="analytics-card">
                        <h4>User Base</h4>
                        <p>👥 Members: 200+</p>
                        <p>🛡️ Admins: 2</p>
                        <p>🕒 Active Sessions: High</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Admin;
