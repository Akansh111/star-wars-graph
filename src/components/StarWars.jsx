import React from 'react';
import ScatterPlot from './ScatterChart';
import CardComponent from '../utility/CardUtil';
import SimpleSelect from '../utility/DropDownUtility'
import { StarWarsContextProvider } from '../context/CreateContext';
import './StarWarsStyle.css';

export const StarWarComponent = (props) => {

    return (
        <div className="main-container">
            <div className="card-heading col-sm-12 col-xs-12 col-md-12"><CardComponent heading='Star Wars Universe'></CardComponent></div>
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