import React, { useState, useEffect, forwardRef} from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar"
import {db} from './firebase'
import firebase from 'firebase'

const Post = forwardRef(
    ({postId, user, username, caption, imageUrl}, ref ) => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(()=> {
        let unsubscribe;
        if(postId){
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timeStamp', 'desc')
                .onSnapshot((snapshot) => { 
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }
        return () => {
            unsubscribe()
        }
    }, [postId])

    const postComment = (event) => {
        event.preventDefault()
        db.collection('posts').doc(postId).collection('comments').add({
            text: comment, 
            username: user.displayName,
            // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setComment('')
    }
    return (
        <div className='post' ref={ref}>
            <div className='post__header'>
                {/* header post */}
                <Avatar 
                    className='post__avatar'
                    alt={username}
                    src="/static/images/avatar/1.jpg"/>
                    {/* adding jsx into html element */}
                    <h3>{username}</h3>
            </div>
            {/* image */}
            <img  className='post__image' src={imageUrl} alt='post' />

            {/*  user name and caption */}
            <h4 className='post__text'>
                <strong>
                    {username}
                </strong>
                <span className='post_caption'>
                    {caption}
                </span>
            </h4>
            <div className='post__comments'>
                {comments.map((comment) =>(
                    <p>
                        <strong>{comment.username}</strong>{comment.text}
                    </p>
                ))}
            </div>

            {user && (
                <form className='post__commentBox'>
                    <input
                        className='post__input'
                        type='text'
                        placeholder='Add a comment...'
                        value={comment}
                        onChange={(e)=> setComment(e.target.value)}
                    />
                    <button
                        disabled={!comment}
                        className="post__button"
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>
            )}
        </div>
        )
    }
)

export default Post