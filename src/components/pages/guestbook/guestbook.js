import { useState, useEffect } from 'react';
import axios from 'axios';

const GuestBook = () => {
    const [guests, setGuests] = useState([]);
    const [form, setForm] = useState({ name: '', message: '' });
    const [errors, setErrors] = useState({});

    // Fetch existing guest entries
    const fetchGuests = async () => {
        try {
            const res = await axios.get('https://web.skdev.rf.gd/gbdb/get_guests.php');
            setGuests(res.data);
        } catch (error) {
            console.error("Error fetching guests:", error);
        }
    };

    useEffect(() => {
        fetchGuests();
    }, []);

    // Validate input fields
    const validateForm = () => {
        const tempErrors = {};
        if (!form.name.trim()) {
            tempErrors.name = "Name is required";
        } else if (form.name.length < 2) {
            tempErrors.name = "Name must be at least 2 characters";
        }

        if (!form.message.trim()) {
            tempErrors.message = "Message is required";
        } else if (form.message.length < 5) {
            tempErrors.message = "Message must be at least 5 characters";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.post('https://web.skdev.rf.gd/gbdb/add_guest.php', form);
            setForm({ name: '', message: '' });
            fetchGuests();
        } catch (error) {
            alert("Submission failed. Check  internet.");
        }
    };

    return (
        <div style={{
            maxWidth: 500,
            margin: '40px auto',
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
            padding: 32,
            fontFamily: 'Segoe UI, Arial, sans-serif'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#2d3748' }}>Sign the Guest Book</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
                <div style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, color: '#4a5568' }}>
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: errors.name ? '1.5px solid #e53e3e' : '1.5px solid #cbd5e0',
                            borderRadius: 6,
                            fontSize: 16,
                            outline: 'none',
                            transition: 'border 0.2s'
                        }}
                    />
                    {errors.name && <div style={{ color: '#e53e3e', marginTop: 4, fontSize: 14 }}>{errors.name}</div>}
                </div>

                <div style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, color: '#4a5568' }}>
                        Message
                    </label>
                    <textarea
                        placeholder="Your Message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows="4"
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: errors.message ? '1.5px solid #e53e3e' : '1.5px solid #cbd5e0',
                            borderRadius: 6,
                            fontSize: 16,
                            outline: 'none',
                            resize: 'vertical',
                            transition: 'border 0.2s'
                        }}
                    />
                    {errors.message && <div style={{ color: '#e53e3e', marginTop: 4, fontSize: 14 }}>{errors.message}</div>}
                </div>

                <button
                    type="submit"
                    style={{
                        background: '#3182ce',
                        color: '#fff',
                        padding: '12px 28px',
                        border: 'none',
                        borderRadius: 6,
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 1px 4px rgba(49,130,206,0.08)',
                        transition: 'background 0.2s'
                    }}
                >
                    Submit
                </button>
            </form>

            <h3 style={{ color: '#2d3748', marginBottom: 16 }}>Guest Entries</h3>
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {guests.length === 0 ? (
                    <p style={{ color: '#718096', textAlign: 'center' }}>No entries yet.</p>
                ) : (
                    guests.map((guest, index) => (
                        <div
                            key={index}
                            style={{
                                borderBottom: '1px solid #e2e8f0',
                                padding: '14px 0',
                                marginBottom: 8
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                                <span style={{ fontWeight: 600, color: '#2b6cb0', marginRight: 8 }}>{guest.name}</span>
                                <span style={{ fontSize: 13, color: '#a0aec0' }}>
                                    {guest.created_at}
                                </span>
                            </div>
                            <div style={{ color: '#2d3748', fontSize: 15, whiteSpace: 'pre-line' }}>
                                {guest.message}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default GuestBook;
