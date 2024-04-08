const initialState = {
    heroes: [],
    filters: [],
    activeFilter: 'all',
    isHeroesLoading: false,
    heroesError: null,
    isFiltersLoading: false,
    filtersError: null
}

const heroesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETHING' : 
            return {...state, isHeroesLoading: true}
        case 'HEROES_FETCHED' : 
            return {...state, heroes: action.payload, isHeroesLoading: false}
        case 'HEROES_FETCHING_ERROR' : 
            return {...state, heroesError: action.payload, isHeroesLoading: false}
        case 'CREATE_NEW_HERO' :
            return {...state, heroes: [...state.heroes, action.payload]}
        case 'FILTERS_FETCHING' : 
            return {...state, isFiltersLoading: true}
        case 'FILTERS_FETCHED' : 
            return {...state, filters: action.payload, isFiltersLoading: false}
        case 'FILTERS_FETCHING_ERROR' : 
            return {...state, filtersError: action.payload, isFiltersLoading: false}
        case 'SELECT_ACTIVE_FILTER' :
            return {...state, activeFilter: action.payload}
        case 'DELETE_HERO' : 
            return {...state, heroes: state.heroes.filter(hero => hero.id !== action.payload)}
        default: return state 
    }
}

export default heroesReducer