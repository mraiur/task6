import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './ListGames.scss';
import Data from './../Data.json';


export default class ListGames extends Component{
	state = {
		categories: []
	};

	render = () => {
		let categories = Data.categories.map( (cat, index) => {
			let mainGame = null;
			let games = [];
			cat.games.forEach( (game,gameIndex) => {
				let block = <Link to={`/view/${game.id}`}className='card'>
					<img src={game.thumb} className="card-img-top" alt={game.name} />
					<div className="card-body">
						<div className="card-title">
							{game.name}
						</div>
					</div>
				</Link>;

				if( gameIndex === 0 )
				{
					mainGame = <div key={`cat-${index}-game-${gameIndex}`} className='col-sm-12 main-game'>{block}</div>;
				}
				else
				{
					games.push(<div key={`cat-${index}-game-${gameIndex}`} className='col-sm-3'>{block}</div>);
				}
			});

			return <div className="card my-5 shadow-sm row category-card" key={`category-${index}`}>
					<div className='col-sm-12'>
						<div className='text-center pt-2 pb-2'>
							<h3>{cat['title']}</h3>
						</div>
					</div>

					<div className='row games'>
						<div className='col-sm-4 pl-4 pt-0 main-game-container'>
							{mainGame}
						</div>
						<div className='col-sm-8 row games-container'>
							{games}
						</div>
					</div>

				</div>
		});
		return (
			<div className="games-grid-container">
				<div className="py-5 bg-light">
					<div className="container">
						{categories}
					</div>
				</div>
			</div>
		);
	}
};

