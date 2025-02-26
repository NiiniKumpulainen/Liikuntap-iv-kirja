import React, { useEffect } from 'react';
import useLocalStorage from '../../shared/uselocalstorage/uselocalstorage';
import AppRouter from '../AppRouter';
import testdata from '../../tests/testdata.js';

function App() {
  const [data, setData] = useLocalStorage('Liikuntapäiväkirja-data', []);
  const [typelist, setTypelist] = useLocalStorage('Liikunapäiväkirja-typelist', []);

  useEffect(() => {
    if (data.length === 0) {
      setData(testdata);
    }
    console.log("data:", data);
    console.log("typelist:", typelist);
  }, [data, setData, typelist, setTypelist]);

  const handleItemDelete = (id) => {
    let copy = data.slice();
    copy = copy.filter(item => item.id !== id);
    setData(copy);
  };

  const handleItemSubmit = (newitem) => {
    let copy = data.slice();

    const index = copy.findIndex(item => item.id === newitem.id);
    if (index >= 0) {
      copy[index] = newitem;
    } else {
      copy.push(newitem);
    }

    copy.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return bDate - aDate;
    });

    setData(copy);
  };

  const handleTypeSubmit = (type) => {
    let copy = typelist.slice();
    copy.push(type);
    copy.sort();
    setTypelist(copy);
  };

  return (
    <>
      <AppRouter
        data={data}
        typelist={typelist}
        onItemSubmit={handleItemSubmit}
        onItemDelete={handleItemDelete}
        onTypeSubmit={handleTypeSubmit}
      />
    </>
  );
}

export default App;