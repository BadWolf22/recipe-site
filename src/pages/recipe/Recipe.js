import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

// styles
import './Recipe.css'

export default function Recipe() {
    const { id } = useParams();
    const { data: recipe, isPending, error } = useFetch(`http://localhost:3000/recipes/${id}`);

    return (
        <div className='recipe'>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {recipe && <>
                <h2 className='page-title'>{recipe.title}</h2>
                <p>Cooking Time: {recipe.cookingTime}</p>
                <ul className='ingredients'>
                    {recipe.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
                </ul>
                <p className='method'>{recipe.method}</p>
            </>}
        </div>
    )
}