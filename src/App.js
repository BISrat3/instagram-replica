import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post'
import ImageUpload from './ImageUpload'
import { db, auth } from './firebase'
import {Avatar, Button, Input, makeStyles, Modal} from '@material-ui/core'
import FlipMove from "react-flip-move"
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle (){
  const top = 50; 
  const left = 50;

  return {
    height: "300px",
    top:`${top}%`,
    left:`${left}%`, 
    transform:`translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundcolor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      // consistent spacing between the elements
      padding: theme.spacing(2, 4, 3),
    },
  }));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle)

  // state is short term memory in stack || state is setting variable 
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        // user has logged in
        // console.log(authUser)
        setUser(authUser)
      if (authUser.displayName){
        // don't update username
      } else {
        return authUser.updateProfile({
          displayName: username,
        })
      }
      }else{
        // user has logged out
        setUser(null)
      }
    })
    return () => {
      // perform some cleanup actions
      unsubscribe ()
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      // everytime when there is change it snapchat, 
      // everytime a new post is added this code fire
      .onSnapshot((snapshot) => 
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data()
          })))
        )
  }, [])

  const signUp = (event) => {
    event.preventDefault()

    auth
      .createUserWithEmailAndPassword(email, password)
      // .then((authUser) =>{
      //   return authUser.user.updateProfile({
      //     displayName: username,
      //   })
      // })
      .catch((error) => alert (error.message))
      setOpen(false)
  }

  const signIn =(event) =>{
    event.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    setOpenSignIn(false)
  }

  return (
    <div className='app'>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__login'>
            <center>
              <img 
                classname="app__headerImage"
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' 
                alt=""
              />
            </center>
            <Input 
              placeholder="username"
              type="text"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              />
            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              />
    
            <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              />

            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__login'>
            <center>
              <img 
                className='app_headerImage' 
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt=''/>
            </center>

            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              />
    
            <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              />

            <Button type="submit" onClick={signIn}>
              Log In
            </Button>
          </form>
        </div>
      </Modal>
      <div className='app__header'>
        <img 
          className='app__headerImage'
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt='' 
          />

          {user?.displayName ? (
            <div className='app__headerRight'>
              <Button onClick ={() => auth.signOut()}>
                Log Out
              </Button>
              <Avatar 
                className='app__headerAvatar'
                alt={user.displayName}
                src="/static/images/avatar/1.jpg">
              </Avatar>
            </div>
          ) : (
            <form className='app__loginContainer'>
              <Button onClick={() => setOpenSignIn(true)}>Log In</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
            </form>
          )}
      </div>
    <div className='app__posts'> 
      <div className='app__postsLeft'>
        <FlipMove>
          {posts.map(({id, post}) => (
            <Post 
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
              />
          ))}
        </FlipMove>
      </div>
      <div classname="app__postsRight">
        <InstagramEmbed 
          url="https://instagr.am/p/Zw904/"
          maxWidth={320}
          hideCaption={false}
          containerTagName="div"
          protocol=''
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
          />
      </div>
    </div>      

        {/* this option checking */}
        {user?.displayName ? (
      <div className='app__upload'>
          <ImageUpload username ={user.displayName}/>
      </div>
          ) : (
          // or do the following
          <h2 className='app__login__upload'>LOG INTO UPLOAD</h2>
        )}
    </div>
  );
}

export default App;
