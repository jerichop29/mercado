import React from 'react';
import ThreeDModel from '../../../3dmodel/module/ThreeDModel';
import './Building.css';

export default function Building({models}){
    return(
        <div className="building-container">
            <div className="model-container">
                <ThreeDModel models={models} />
            </div>
        </div>
    )
}