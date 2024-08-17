import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { translateText } from '../../utils/translate'; // Ensure the correct path
import './NewsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Added success message state
  const [translatedContent, setTranslatedContent] = useState('');
  const [translatedComments, setTranslatedComments] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState('en'); // Default language

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/api/news/${id}`);
        setNewsItem(response.data);

        // Fetch comments related to this news item
        const commentsResponse = await axios.get(`http://127.0.0.1:8000/api/news/${id}/comments`);
        setComments(commentsResponse.data);
      } catch (err) {
        setError('Failed to fetch news details.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  const handleTranslation = async () => {
    if (newsItem) {
      const translatedBody = await translateText(newsItem.content, targetLanguage);
      setTranslatedContent(translatedBody);

      const translatedCommentList = await Promise.all(
        comments.map(async (comment) => ({
          ...comment,
          content: await translateText(comment.content, targetLanguage),
        }))
      );
      setTranslatedComments(translatedCommentList);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      setCommentError('Comment cannot be empty.');
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/news/${id}/comments`, {
        content: newComment,
      });

      setComments([...comments, response.data]);
      setNewComment('');
      setCommentError('');
      setSuccessMessage('Comment added successfully.'); // Set success message
    } catch (err) {
      setCommentError('Failed to submit comment.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="news-detail-container">
      {newsItem ? (
        <div className="news-detail">
          {newsItem.image && (
            <img
              src={`http://127.0.0.1:8000/storage/${newsItem.image}`}
              alt={newsItem.title}
              className="news-detail-image"
            />
          )}
          <h1 className="news-detail-title">{newsItem.title}</h1>
          <div className="news-detail-author">By {newsItem.author}</div>
          <div
            className="news-detail-body"
            dangerouslySetInnerHTML={{ __html: translatedContent || newsItem.content }}
          ></div>

          {/* Language Selection */}
          <div className="translation-section">
            <label htmlFor="language-select">Translate to:</label>
            <select
              id="language-select"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ta">Tamil</option> {/* Tamil added here */}
              {/* Add more languages as needed */}
            </select>
            <button onClick={handleTranslation}>Translate</button>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <h2 className="comments-title">Comments</h2>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <button type="submit">Submit</button>
              {commentError && <div className="comment-error">{commentError}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
            </form>
            <div className="comments-list">
              {translatedComments.length ? (
                translatedComments.map((comment, index) => (
                  <div key={index} className="comment">
                    <div className="comment-content">{comment.content}</div>
                  </div>
                ))
              ) : (
               <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>No details available.</div>
      )}
    </div>
  );
};

export default NewsDetail;
