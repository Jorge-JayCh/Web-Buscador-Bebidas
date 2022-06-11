import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Context

export const CategoriasContext = createContext();

// Provider de funiciones y state

const CategoriasProvider = (props) => {

    // state del context
    const [ categorias, guardarCategorias ] = useState([]);

    // llamado a la api
    useEffect(()=> {
        const obtenerCategorias = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
            const respuesta = await axios.get(url);
            guardarCategorias(respuesta.data.drinks);
        }

        obtenerCategorias();

    }, []);


    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    );
}

export default CategoriasProvider;