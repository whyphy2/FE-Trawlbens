import React, { useState, useEffect, useRef } from 'react';
import loadingImg from "../../assets/loading.gif";
import  "./loading.scss"


const Loading = () => {
    return (
        <div className='loadings'>
            <img src={loadingImg} alt="" />
        </div>
    );
}

export default Loading;