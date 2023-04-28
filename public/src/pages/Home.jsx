import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Link to="/chat">
      <button>chat with friends</button>
        
         </Link>

         <Link to="/randomchat">
      <button>chat with strangers</button>
        
         </Link>
   


    </div>
  )
}

export default Home