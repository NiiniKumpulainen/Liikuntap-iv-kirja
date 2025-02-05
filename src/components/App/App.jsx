import { useState } from 'react'
import useLocalStorage from '../../shared/uselocalstorage/uselocalstorage'
import AppRouter from '../AppRouter'
import testdata from './testdata.js'
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc  } from 'firebase/firestore'


import firebase, { auth } from './firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import Startup from '../Startup'

import { useEffect } from 'react'



function App() {
  const [data, setData] = useState([])
  
  const [typelist, setTypelist] = useState([])
  const [user, setUser] = useState()

  
  const firestore = getFirestore(firebase)




  useEffect( () => {
    const unsubscribe = onSnapshot(query(collection(firestore,'type'),
                                         orderBy('type')),
                                   snapshot => {
      const newTypelist = []
      snapshot.forEach( doc => {
        newTypelist.push(doc.data().type)
      })
      setTypelist(newTypelist)
    })
    return unsubscribe
  }, []) 

  useEffect( () => {
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [])



  const handleItemDelete = async (id) => {
    await deleteDoc(doc(firestore, 'item', id))
  }
  const handleItemSubmit = async (newitem) => {
    await setDoc(doc(firestore, 'item', newitem.id), newitem)
  }

  const handleTypeSubmit = async (type) => {
    await addDoc(collection(firestore,'type'),{type: type})
  }

  
 
        return (
    <>
    { user ?
          <AppRouter data={data}
                     typelist={typelist}
                     onItemSubmit={handleItemSubmit}
                     onItemDelete={handleItemDelete}
                     onTypeSubmit={handleTypeSubmit} />
        : <Startup auth={auth} />
      }
    </>
  )
}
export default App