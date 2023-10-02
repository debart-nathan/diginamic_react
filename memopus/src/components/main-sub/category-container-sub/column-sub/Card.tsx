
import { FC } from 'react';
import { CardInterface } from '../../../../Interface/CardInterface';







const Card :FC<{card:CardInterface}> = ({card}) => {

    return (
        <article className='card d-flex flex-row bg-dark text-light p2'>
            <div>
                <button>{"<"} </button>
            </div>
            <div className='card-content d-flex flex-column align-center p-3 w-100'>
                <h4>{card.question}</h4>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-primary m-2'>Proposer une réponse</button>
                </div>
                
            </div>
            <div>
                <button> {">"} </button>
            </div>
            
        </article>
    );
}

export default Card;