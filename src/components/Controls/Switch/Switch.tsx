import React from 'react';
import * as Interface from '../../../reducer/types';
import './Switch.scss';

export const Switch:React.FC<Interface.Switch> = props => {
    return (<div className="switch-control-component">
        <div className="switch-button" onClick={() => props.onToggle(!props.isOn)}>
            <div className={props.isOn ? 'toggled' : null}></div>
        </div>
        <div>{props.children}</div>
    </div>);
}