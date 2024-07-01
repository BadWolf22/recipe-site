import { useEffect, useRef, useState } from 'react'
import { useFetch } from '../../hooks/useFetch';

// styles
import './Create.css'
import { Navigate } from 'react-router-dom';

export default function Create() {
    const [title, setTitle] = useState("");
    const [method, setMethod] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [ingredients, setIngredients] = useState(new Set());
    const [currentIngredient, setCurrentIngredient] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const { postData, data, error, isPending } = useFetch("http://localhost:3000/recipes", "POST");

    const ingredientInputRef = useRef(null);

    useEffect(() => {
        if (submitted) {
            postData({ title, ingredients: [...ingredients], method, cookingTime: cookingTime + " minutes" });
            setSubmitted(() => false);
        }
    }, [ingredients, submitted]);

    const handleSubmit = async (e) => {
        e?.preventDefault();
        handleAddIngredient();
        setSubmitted(() => true);
    };

    const handleAddIngredient = (e) => {
        e?.preventDefault();
        var value = currentIngredient.trim();
        if (value == "") return;

        ingredientInputRef.current.focus();
        setIngredients(prev => new Set(prev).add(value));
        setCurrentIngredient(() => "");
    }

    const handleRemoveIngredient = (ingredient) => {
        setIngredients(prev => {
            const newSet = new Set(prev);
            newSet.delete(ingredient);
            return newSet;
        });
    }

    return (
        <div className='create'>
            <h2 className='page-title'>Add a new recipe</h2>
            {error && <p>error</p>}
            {data && <Navigate to={`/recipes/${data.id}`} replace={true} />}
            {isPending && <p>Loading...</p>}
            {!isPending && !error && 
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe title:</span>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>
                <label>
                    <span>Ingredients:</span>
                    <div className='ingredient-input'>
                        <input
                            type='text'
                            onChange={(e) => setCurrentIngredient(e.target.value)}
                            value={currentIngredient}
                            ref={ingredientInputRef}
                            required={ingredients.size == 0}
                            pattern='.*[^\s]+.*'
                        />
                        <button onClick={handleAddIngredient} className='btn'>Add</button>
                    </div>
                    <ul>
                        {[...ingredients].map(ingredient => 
                            <li key={ingredient} className='ingredient'>
                                <>
                                    <b onClick={() => handleRemoveIngredient(ingredient)} className='delete-btn noselect'>🗑️</b>
                                    {ingredient}
                                </>
                            </li>
                        )}
                    </ul>
                </label>
                <label>
                    <span>Recipe method:</span>
                    <textarea
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>
                <label>
                    <span>Cooking time (minutes):</span>
                    <input
                        type='number'
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>
                <button className='btn'>submit</button>
            </form>}
        </div>
    )
}