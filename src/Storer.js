import { useContext } from 'react';
import { AppContext } from './context/AppContext';

const Strorer = () => {

    const [store] = useContext(AppContext);
    console.log(store)
    return 'store';
}

export default Strorer;