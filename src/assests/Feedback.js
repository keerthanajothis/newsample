import React, { useState } from 'react';
import './Feedback.css'
const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const feedbackData = { name, email, feedback, rating };

        try {
            const response = await fetch('https://example.com/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Optionally, handle response data
            const result = await response.json();
            console.log('Feedback submitted:', result);

            // Reset the form
            setName('');
            setEmail('');
            setFeedback('');
            setRating('');
            setSubmitted(true);
        } catch (error) {
            setError('There was a problem submitting your feedback. Please try again later.');
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div>
            <h2>Feedback Form</h2>
            {submitted ? (
                <p>Thank you for your feedback!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Email:
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Feedback:
                            <textarea 
                                value={feedback} 
                                onChange={(e) => setFeedback(e.target.value)} 
                                required 
                            />
                        </label>
                    </div>
                    <div>
                        <label>Rating:</label>
                        <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <label key={star}>
                                    <input 
                                        type="radio" 
                                        value={star} 
                                        checked={rating === star.toString()} 
                                        onChange={(e) => setRating(e.target.value)} 
                                        required 
                                    />
                                    {star}
                                </label>
                            ))}
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default FeedbackForm;
