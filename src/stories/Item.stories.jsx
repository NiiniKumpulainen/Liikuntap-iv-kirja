import Item from '../components/Item'
import { MemoryRouter } from 'react-router-dom'

export default {

      title: 'Components/Item',
    
      component: Item,
    
      tags: ['autodocs'],
    
      decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
    
      argTypes: {
    
        data: { control: 'object' },
    
      },
    
    }
    
    
    
    export const Default = { 
    
      args: {
    
        data: {
    
         id: '1',
    
        type: 'Juoksu',
    
        amount: 30,
    
        date: '2024-03-08',
    
        length: '5 km'
    
         
    
        }
    
      }
    
    }
    
    
    
    export const OnlyRequiredData = {
    
      args: {
    
        data: {
    
         id: '2',
    
        type: 'Pyöräily',
    
        amount: 60,
    
        date: '2024-03-09',
    
        length: '10 km'
    
    
    
        }
    
      }  
    
    }

    