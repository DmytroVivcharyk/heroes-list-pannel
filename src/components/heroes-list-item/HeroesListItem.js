import { useDispatch } from 'react-redux';
import { deleteHero } from '../../store/actions/heroesActions';

import './HeroesListItem.scss'

const HeroesListItem = ({name, description, element, id, itemRef}) => {
    const dispatch = useDispatch()
    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    const onDeleteHero = (id) => {
        fetch(`http://localhost:3100/heroes/${id}`, {
            method: 'DELETE'
        }).then(() => {dispatch(deleteHero(id))})
            .catch(e => console.error(e))
    }

    return (
        <li 
        className={`heroesListItem ${elementClassName}`}
        ref={itemRef}
        >
            <img src="https://images.squarespace-cdn.com/content/v1/6282ec55d5f3c229291fcb47/1674437725718-PQYL45LC1J5G7XX6ZAIM/image-asset.png" 
                 alt='some hero'   
            />
            <div className='heroesListItem__info'>
                <h4 className='heroesListItem__title'>{name}</h4>
                <p className='heroesListItem__description'>{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button 
                type="button" 
                className="btn-close btn-close" 
                aria-label="Close"
                onClick={() => onDeleteHero(id)}
                ></button>
            </span>
        </li>
    )
}

export default HeroesListItem