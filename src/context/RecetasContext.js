import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const RecetasContext = createContext();

const RecetasProvider = (props) => {


    // State para las recetas
    const [ recetas, guardarRecetas ] = useState([]);
    const [ busqueda, buscarRecetas ] = useState({
        nombre: '',
        categoria: ''
    });

    // state para la consulta
    const [ consultar, guardarConsultar ] = useState(false);

    
    useEffect(() => {
        
        const { nombre, categoria } = busqueda;

        if (consultar) {
            const obtenerRecetas = async () => {
                const url=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
    
                const resultado = await axios.get(url);
    
                // console.log(resultado.data.drinks);
                guardarRecetas(resultado.data.drinks);
            }
            obtenerRecetas();
        }
    }, [busqueda,consultar]);
 
    return(
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar

            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}

export default RecetasProvider;