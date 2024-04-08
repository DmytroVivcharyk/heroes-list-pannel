import { useEffect, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group'

import Spiner from '../../components/spiner/Spiner'
import { fetchingHeroesError, fetchingHeroes, heroesFetched } from '../../store/actions/heroesActions'
import HeroesListItem from "../heroes-list-item/HeroesListItem"

import './HeroesList.scss'

const HeroesList = () => {
    const filteredHeroes = useSelector(state => {
        if(state.activeFilter === 'all') return state.heroes

        return state.heroes.filter(hero => hero.element === state.activeFilter)
    })
    // const heroes = useSelector(state => state.heroes)
    const isHeroesLoading = useSelector(state => state.isHeroesLoading)
    const heroesError = useSelector(state => state.heroesError)

    // const nodeRefs = useRef([])
    const dispatch = useDispatch()

    // const addRef = (id, ref) => {
    //     nodeRefs.current[id] = ref
    // }
    
    useEffect(() => {
        dispatch(fetchingHeroes())
        fetch('http://localhost:3100/heroes')
            .then(res => res.json())
            .then(data => dispatch(heroesFetched(data)))
            .catch(e => dispatch(fetchingHeroesError(e)))
            
    // eslint-disable-next-line 
    }, [])

    const renderHeroesList = (arr) => {
        if(arr.length === '0') {
            return <h5 className="text-center mt-5">There is no heroes yet...</h5>
        }

        return (
            <TransitionGroup>
                {arr.map(({id, ...props}) => {
                    const itemRef = createRef(null);
                    return (
                        <CSSTransition
                        key={id}
                        timeout={500}
                        onEntered={() => {itemRef.current.classList.add('animate')}}
                        // nodeRef={nodeRefs.current[i]}
                        nodeRef={itemRef}
                        classNames={'heroCard'}
                        >
                            <HeroesListItem 
                                id={id} 
                                itemRef={itemRef}
                                // addRef={addRef} 
                                // i={i} 
                                {...props}/>
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        )
    }

    if(isHeroesLoading) return <Spiner />

    if(heroesError) {
        return <h5> Something went wrong </h5>
    }

    const elements = renderHeroesList(filteredHeroes)

    return (
        <ul className="heroesList px-5 ">
            {elements}
        </ul>
    )
}

export default HeroesList