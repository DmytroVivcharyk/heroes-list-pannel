export const fetchingHeroes = () => ({type: 'HEROES_FETHING'})

export const heroesFetched = (heroes) => ({
    type: 'HEROES_FETCHED',
    payload: heroes
})

export const fetchingHeroesError = () => ({type: 'HEROES_FETCHING_ERROR'})

export const createNewHero = (data) => ({
    type: 'CREATE_NEW_HERO',
    payload: data
})

export const fetchinFilters = () => ({type: 'FILTERS_FETCHING'})

export const filtersFetched = (filters) => ({
    type: 'FILTERS_FETCHED',
    payload: filters
})

export const fetchingFiltersError = () => ({type: 'FILTERS_FETCHING_ERROR'})

export const setActiveFilter = (filter) => ({
    type: 'SELECT_ACTIVE_FILTER',
    payload: filter
})

export const deleteHero = (id) => ({
    type: 'DELETE_HERO',
    payload: id
})