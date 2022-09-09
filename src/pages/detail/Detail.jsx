import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router';


import requestApi from '../../api/requestApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';

import Button, { OutlineButton } from '../../components/button/Button';
import Modal, { ModalContent } from '../../components/modal/Modal';
import Input from '../../components/input/Input';

import Loading from '../../components/Loading/Loading';

const Detail = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getDetail = async () => {
            setLoading(true)
            const response = await requestApi.detail(category, id, {params:{}});
            setItem(response);
            window.scrollTo(0,0);
            setLoading(false)
        }
        getDetail();
    }, [category, id]);

    const setModalAcive = async () =>{
        const modal = document.querySelector(`#modal_${item.id}`);
        if(!localStorage.getItem("guest_session_id")){
            const response = await requestApi.getGuestSession();
            // console.log(response)
            localStorage.setItem("guest_session_id", response.guest_session_id)
        }
        modal.classList.toggle('active');
    }

    return (
        
            loading ? <Loading/> :<>
            {
                item && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    <span className='genres__item'><i className='bx bxs-star'></i> {item.vote_average.toFixed(2)}</span>   
                                    <OutlineButton className="genres__item" onClick={setModalAcive}>Rate</OutlineButton>
                                </div>
                                    {
                                        <TrailerModel item={item}/>
                                    }
                                <div className="genres">
                                    {
                                       
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                    
                                </div>
                                <p className="overview">{item.overview}</p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id}/>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
                </>
        
    );
}

const TrailerModel = props => {
    const item = props.item;
    const ref = useRef(null);
    console.log(ref)
    const onClose = () => console.log(ref);
    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <div ref={ref} width="20%" height="50px" title="Rate">
                    <MovieRate items={item} />
                </div>
            </ModalContent>
         </Modal>
    )
}



const MovieRate = props => {

    const history = useHistory();
    
    const items = props.items
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToPostRate = async () => {
            if (keyword.trim().length > 0) {
                const postData = await requestApi.postRate(items.id, keyword);
                console.log(postData);
                history.push(`/rate`);
            }
        };


    return (
        <>
        <div className="movie-search">
            <Input
                type="number"
                placeholder="Masukan Nilai"
                min={1}
                max={10}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToPostRate}>Rate</Button>
        </div>
        </>
    )
}

export default Detail;
