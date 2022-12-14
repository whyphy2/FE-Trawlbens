import React from 'react';

import { useParams } from 'react-router';

import PageHeader from '../components/page-header/PageHeader';

import { category as cate } from '../api/requestApi';
import MovieGrid from '../components/movie-grid/MovieGrid';


const Catalog = () => {

    const { category } = useParams();

    return (
        <>
            <PageHeader>
                {category === cate.movie ? 'Movies' : 'Rating Movie'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category}/>
                    {console.log({category})}
                </div>
            </div>
        </>
    );
}

export default Catalog;
