import { useSelector, useDispatch } from 'react-redux'


import { setActiveFilter } from '../../store/actions/heroesActions'
import Spiner from '../spiner/Spiner'

const HeroesFilters = () => {
    const filters = useSelector(state => state.filters)
    const isFiltersLoading = useSelector(state => state.isFiltersLoading)
    const filtersError = useSelector(state => state.filtersError)
    const activeFilter = useSelector(state => state.activeFilter)

    const dispatch = useDispatch()

    const renderButtons = (arr) => {
        if (arr.length === 0) {
            return <h4>There is no filters yet...</h4>
        }

        return arr.map((item, id)  => {

        let buttonClassName = 'btn'

        switch (item) {
            case 'fire':
                buttonClassName += ' btn-danger';
                break;
            case 'water':
                buttonClassName += ' btn-primary';
                break;
            case 'wind':
                buttonClassName += ' btn-success';
                break;
            case 'earth':
                buttonClassName += ' btn-secondary';
                break;
            default:
                buttonClassName += ' btn-outline-dark';
        }

        if(item === activeFilter) {
            buttonClassName += ' active'
        }
            return <button 
            className={buttonClassName}
            key={id}
            onClick={() => dispatch(setActiveFilter(item))}
            >{item}</button>
        })
    }

    const buttonsError = filtersError ? <div>Something went wrong</div> : null
    const buttonssLoading = isFiltersLoading ? <Spiner/> : null
    const myButtons = (filtersError || isFiltersLoading) ? null : renderButtons(filters)
    
    
    return (
        <div className="card shadow-lg">
            <div className="card-body">
                <p className="card-text">Filter heroes by elements</p>
                <div className="btn-group">
                    {buttonsError}
                    {buttonssLoading}
                    {myButtons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;