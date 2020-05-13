import React from 'react'
import CardComponent from '../utility/CardUtil';
import SimpleSelect from '../utility/DropDownUtility'
import './StarWarsStyle.css'

export const StarWarComponent = () => {

    return (
        <div className="main-container">
            <CardComponent heading='Star Wars Universe'></CardComponent>
            <div className='select-option'>
                <div className='dropdown-header'>Pick a Species</div>
                <SimpleSelect></SimpleSelect>
            </div>

        </div>

    )

}