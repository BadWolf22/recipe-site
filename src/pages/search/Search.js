import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList/RecipeList';
import './Search.css'

export default function Search() {
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const searchTerm = queryParams.get("term");

    // This doesn't actually work, but it is JSON-Server's fault afaik
    const {data, isPending, error} = useFetch(`http://localhost:3000/recipes?q=${searchTerm}`);

    return (
        <div>
            <h2 className='page-title'>Recipes including "{searchTerm}"</h2>
            {isPending && <p className='loading'>Loading...</p>}
            {error && <p className='error'>{error}</p>}
            {data && <RecipeList recipes={data}/>}
        </div>
    )
}