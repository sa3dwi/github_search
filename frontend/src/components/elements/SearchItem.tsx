import React from 'react';

type SearchProps = { item: any, type: string }; 

const SearchItem = (props:SearchProps) => {

    // console.log(props.item.owner.login);
    return (
        (props.type === 'users') ? 
            <li className="list-item">
                <img alt={props.item.login} src={props.item.avatar_url}/>
                <div>
                    <span>Name: </span>{props.item.login}
                </div>
                <div>
                    <span>Account Url: </span>
                    <a target="_blank" rel="noopener noreferrer" href={props.item.html_url}>{props.item.html_url}</a>
                </div>
            </li>
        :
            <li className="list-item">
                <img width="256" height="256" alt={props.item.login} src={props.item.owner.avatar_url}/>
                <div>
                    <span>Repository name: </span>{props.item.full_name} <br/>
                    <span>Repository description: </span>{props.item.description} <br/>
                    <span>Author: </span>{props.item.owner.login} <br/>
                </div>
                <div>
                    <span>Repository Url: </span>
                    <a target="_blank" rel="noopener noreferrer" href={props.item.html_url}>{props.item.html_url}</a>
                </div>
            </li>
    );
    
};

export default SearchItem;