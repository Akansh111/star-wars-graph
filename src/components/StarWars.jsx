import React from 'react'
import CardComponent from '../utility/CardUtil';
import SimpleSelect from '../utility/DropDownUtility'
import './StarWarsStyle.css';
import ScatterPlot from './ScatterChart';
import {StarWarsContextProvider} from '../context/CreateContext'

export const StarWarComponent = (props) => {

    return (
        <div className="main-container">
            <CardComponent heading='Star Wars Universe'></CardComponent>
            <div className='select-option'>
                <div className='dropdown-header'>Pick a Species</div>
                <StarWarsContextProvider>
                <SimpleSelect></SimpleSelect>
                <ScatterPlot></ScatterPlot>
                </StarWarsContextProvider>
               
            </div>

        </div>

    )

}