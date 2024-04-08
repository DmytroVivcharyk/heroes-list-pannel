import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { createNewHero, fetchinFilters, fetchingFiltersError, filtersFetched } from '../../store/actions/heroesActions';
import './CreateHeroForm.scss'

const formValidate = yup.object().shape({
    name: yup.string('Should be string').min(2, 'at least 2 chars').max(15, 'too mach symbols').required().trim(),
    description:  yup.string('Should be string').min(2, 'at least 2 chars').max(35, 'too mach symbols').required().trim(),
    element: yup.string().required()
})



const CreateHeroForm = () => {
    const filters = useSelector(state => state.filters)
    const isFiltersLoading = useSelector(state => state.isFiltersLoading)
    const filtersError = useSelector(state => state.filtersError)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchinFilters())
        fetch('http://localhost:3100/filters')
            .then(res => res.json())
            .then(data => dispatch(filtersFetched(data)))
            .catch(e => dispatch(fetchingFiltersError(e)))
    // eslint-disable-next-line 
    }, [])
    
    const onSubmitForm = (values, actions) => {
        const hero = {
            ...values,
            id: uuidv4()
        }
        
        fetch('http://localhost:3100/heroes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(hero)
        }).then(() => { 
            dispatch(createNewHero(hero)) 
            actions.resetForm()
        })
           .catch(e => { throw new Error(e.message) }) 
    }

    const renderOptions = (arr) => {
        if (arr.length === 0) {
            return <option>There is no options yet...</option>
        }


        return arr.map((item, id)  => {
            if(item === 'all') return null
            
            return <option key={id}  value={item}>{item}</option>
        })
    }

    const optionsError = filtersError ? <option>Something went wrong</option> : null
    const optionsLoading = isFiltersLoading ? <option>loading...</option> : null
    const myOptions = (filtersError || isFiltersLoading) ? null : renderOptions(filters)


    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                element: '',
            }}
            validationSchema={formValidate}
            onSubmit={ onSubmitForm }
        >
            {({isSubmiting}) => (
                <Form className="createHeroForm">
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label fs-4'>New Heroe's Name</label>
                        <Field
                            className='form-control'
                            type='text'
                            name='name'
                            id='name'
                            placeholder="Enter heroe's name"
                        />
                        <ErrorMessage component="div" name="name" className='errorMessage' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='description' className='form-label fs-4'>Description</label>
                        <Field
                            as='textarea'
                            name='description'
                            id='description'
                            className='form-control'
                            placeholder='Describe the hero'
                        />
                        <ErrorMessage component="div" name="description" className='errorMessage' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='element' className='form-label fs-4'>Choose element</label>
                        <Field
                            as='select'
                            id='element'
                            name='element'
                            className='form-select'
                        >
                            <option value=''>Heroe's element</option>
                            {optionsError}
                            {optionsLoading}
                            {myOptions}
                        </Field>
                        <ErrorMessage component="div" name="element" className='errorMessage' />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isSubmiting}
                    >Create</button>
                </Form>
            )}
        </Formik>
    )
}

export default CreateHeroForm