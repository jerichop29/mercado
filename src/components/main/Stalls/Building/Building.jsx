import React from 'react';
import Model from '../../../3dmodel/Model'
import './Building.css';

export default function Building({models}){
    return(
        <div className="building-container">
            <Model models={models} />
        </div>
    )
}