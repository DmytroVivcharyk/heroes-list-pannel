import HeroesList from '../heroes-list/HeroesList'
import CreateHeroForm from '../create-hero-form/CreateHeroForm'
import HeroesFilters from '../heroes-filters/HeroesFilters'

import './App.scss'

const App = () => {

    return (
        <div className="main">
            <div className='container'>
                <div className='content'>
                <div className='row'>
                    <div className='col-7'>
                        <HeroesList />
                    </div>
                    <div className='col-5'>
                        <div className='interactive'>
                            <CreateHeroForm />
                            <HeroesFilters />
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default App