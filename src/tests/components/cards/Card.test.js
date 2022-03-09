import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Card } from "../../../components/cards/Card";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <Card
            cid={'TEST-ID'}
            color={'Test-Color'}
            entries={[]}
            month={2}
            photo={''}
            uid={'TEST-USER-ID'}
            year={2022}
            modalState={true}
            setModalState={()=>{}}
            cropperState={{}}
            setCropperState={()=>{}}
        />
    </Provider>
)

describe('Pruebas Card', () => { 

    test('should render the component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })