import React from 'react';

import './movie-card.scss';

import { Link, useHistory } from 'react-router-dom';

import Button from '../button/Button';

import requestApi, { category } from '../../api/requestApi';
import apiConfig from '../../api/apiConfig';

const MovieCard = props => {
    const history = useHistory();

    const item  = props.item;
 
    const link = '/movie/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    const gotoDelete = async () => {
        const response = await requestApi.deleteMyRate(item.id)
        console.log(response)
        // history.push(`/rate`);
        window.location.reload();
    };

    return (
        
        category[props.category] === "movie" ? 
            <Link to={link}>
                <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                    <Button>
                        <i>More</i>
                    </Button>
                </div>
                <h3>{item.title || item.name}</h3>
            </Link> : <div>
                    <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                        <Button onClick={gotoDelete}>
                            <i>Delete Rate</i>
                        </Button>
                    </div>
                    <span className='genres__item'><i className='bx bxs-star'></i> My Rating :  {item.rating}</span>   
                    <h3>{item.title || item.name}</h3>
                </div>        
    );
}

export default MovieCard;
