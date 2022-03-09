import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CardEntries } from "../../../components/cards/CardEntries";

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'


configure({ adapter: new Adapter() })


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: ()=>('dcb93cd7-082d-4c20-a8f1-a39ae1295719'),
    useRouteMatch: () => ({ url: '/cards/dcb93cd7-082d-4c20-a8f1-a39ae1295719' }),

   
  }))

 
  const middlewares = [thunk]

  const mockStore = configureStore(middlewares)
  
  const initState = {
    cards:[{
        cid:"dcb93cd7-082d-4c20-a8f1-a39ae1295719",
        uid:"6206bbb958922200161ea0c3",
        month:0,
        year:2020,
        photo:"",
        color:"#D2D2D2",
        entries:[]
        
    }]
  }
  
  let reduxStore = mockStore(initState)
  
  reduxStore.dispatch = jest.fn()
  
/*
const wrapper = mount(
    <Provider store={store}>
        <CardEntries />
    </Provider>
)
*/
describe('Pruebas Card Entries', () => { 

    test('should render the component', async () => { 
/*
        expect(wrapper).toMatchSnapshot()     
        */   
     })

 })