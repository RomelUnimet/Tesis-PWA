import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import { AppRouter } from "../../router/AppRouter";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/"
    })
}));
  


configure({ adapter: new Adapter() })

const middlewares = [thunk]

const mockStore = configureStore(middlewares)

const initState = {
  auth:{
    checking:false,
    uid:"6206bbb958922200161ea0c3"
  }
}

let reduxStore = mockStore(initState)

reduxStore.dispatch = jest.fn()

describe('Pruebas app router', () => { 

    
    
    test('should render the router', async () => { 

        
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        )

        console.log(wrapper.html())
        expect(wrapper).toMatchSnapshot()

        
     })

 })