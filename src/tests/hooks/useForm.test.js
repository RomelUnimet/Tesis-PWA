
import {useForm} from '../../hooks/useForm'
import {renderHook, act} from '@testing-library/react-hooks'

describe('Pruebas useForm', () => { 
    const initialForm = {
        email:'romel1@gmail.com',
        password: '123123'
    }

    test('Debe regresar formulario ', () => { 
        
        const { result } = renderHook(()=> useForm(initialForm))

        const  [ values, handleInputChange, reset ] = result.current

        expect(values).toEqual(initialForm)
        expect(typeof handleInputChange).toBe('function')
        expect(typeof reset).toBe('function')

     })
    test('Debe cambiar el valor del formulario ', () => { 
        const { result } = renderHook( () => useForm(initialForm) );
        const [ , handleInputChange ] = result.current;

        act( () => {

            handleInputChange({
                target: {
                    name: 'email',
                    value: 'romel2@gmail.com'
                }
            });

        });

        const [ formValues ] = result.current;
        expect( formValues ).toEqual( { ...initialForm, email: 'romel2@gmail.com' } );
     })

 })