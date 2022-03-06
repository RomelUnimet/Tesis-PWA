import { fetchNoToken } from "../../helpers/fetch"


describe('Test on fetch helper', () => { 
    test('FetchNoToken works', async() => { 
        

        
        const resp = await fetchNoToken('auth/new', { email:"romel42069@gmail.com", password:"123123"}, 'POST')

        expect(resp instanceof Response).toBe(true);

        const body = await resp.json()

        expect(body.ok).toBe(true)

     })
 })