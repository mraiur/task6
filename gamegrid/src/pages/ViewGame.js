import React, { Component } from 'react';
import './ViewGame.scss';
import Data from './../Data.json';

function getGameById( id )
{
	let record = {
		"id": 0,
		"name": "",
		"thumb": "",
		"description": ""
	};
	for (let category of Object.entries(Data.categories))
	{
		category[1].games.forEach( (game) => {
			if( game.id === id )
			{
				record = game;
			}
		});
	}
	return record;
}

export default class ViewGame extends Component{
	render = () => {
		const { match: { params } } = this.props;
		const game = getGameById( parseInt(params.gameId, 10) );
		return (
			<div className="container-fluid view-game-container h-100">
				<div className='row'>
					<div className='col-xl-10 col-sm-12 game-container'>
						<div className='text-center pt-5'>
							<div className="spinner-border text-secondary" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					</div>
					<div className='col-xl-2 col-sm-12 game-description'>
						<div className="pt-2 text-center">
							<img src={game.thumb} className="img-fluid img-thumbnail rounded" alt="..." />
						</div>

						<div className="pt-2 text-center">
							{game.name}
						</div>

						<div className="pt-2 text-center">
							{game.description}
						</div>
					</div>
				</div>
			</div>
		);
	}
};

