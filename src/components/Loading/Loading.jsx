import React, { useState, useEffect, useRef } from 'react';
import loadingImg from "../../assets/loading.gif";



const Loading = () => {
    return (
        <div>
            <img src={loadingImg} alt="" />
        </div>
    );
}

export default Loading;