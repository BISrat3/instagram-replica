import React, {useState, useEffect} from 'react';
import './App.css';

function getModalStyle (){
  const top = 50; 
  const left = 50;

  return {
    top:`${top}%`,
    left:`${left}%`, 
    transform:`translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles ((theme) =>({
    paper:{
      position: "absolute",
      width: 400,
      backgroundcolor: theme.platte.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      // consistent spacing between the elements
      padding: theme.spacing(2, 4, 3),
      }
  })
)
function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle)

  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        // user logged in
        // console.log(authUser)
        setUser(authUser)
      } else{
        // user logged out
        setUser(null)
      }
    })
    return () =>{
      unsubscribe ()
    }
  }, [user, username])

  useEffect(() =>{
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>{
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        )
      })
  }, [])

  const signUp = (event) => {
    event.preventDefault()

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) =>{
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => alert (error.message))
  }

  return (
    <div>

    </div>
  );
}

export default App;
