import React from 'react';
import * as Interface from '../../../reducer/interface';
import './Switch.scss';

export const Switch:React.FC<Interface.Switch> = props => {
    return (<div className={['switch-control-component', props.disabled ? 'disabled' : ''].join(' ')}>
        <div className="switch-button" onClick={() => {
            if(!props.disabled) {
                props.onToggle(!props.isOn);
            }
        }}>
            <div className={props.isOn ? 'toggled' : null}></div>
        </div>
        <div>{props.children}</div>
    </div>);
}
