import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className="">
            <p className="f3 centerr">
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div className="centerr">
                <div className="form centerr pa4 br3 shadow-5">
                    <input className='detect-input f4 pa2 w-70 centerr' type="text" onChange={onInputChange}/>
                    <button className="detect-btn w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                            onClick={onButtonSubmit}>
                            Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;