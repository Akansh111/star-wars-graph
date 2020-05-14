// main component to load dropDown and scatterPlot//
import React from 'react';
import ScatterPlot from './ScatterChart';
import SimpleSelect from '../utility/DropDownUtility'
import { StarWarsContextProvider } from '../context/CreateContext';
import logo from '../assets/star_wars_logo.png';

import './StarWarsStyle.css';

export const StarWarComponent = (props) => {

    return (
        <div className="main-container">
            <div className="card-heading col-sm-12 col-xs-12 col-md-12">
                <div className="logo">
                    <img src={logo} width="150px" height="150px" alt="Star Wars"/>
                </div>
            </div>
            <StarWarsContextProvider>
            <div className='select-option'>
                <label className='dropdown-header'>Pick a Species</label>
                
                    <SimpleSelect></SimpleSelect>
                    </div>
                    <ScatterPlot></ScatterPlot>
                </StarWarsContextProvider>
            
        </div>

    )

}