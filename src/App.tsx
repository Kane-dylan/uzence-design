import { Button } from './components/Button'
import './index.css'

function App() {
  return (
    <div className='flex flex-col items-center gap-5'>
      <h1 className='text-3xl font-black'>This is the setup</h1>
      <div className=''>
        <Button
        label='click me'
        />
      </div>
      
    </div>
  )
}

export default App
