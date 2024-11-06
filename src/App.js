

import Header from './component/header';
import VehicleMap from './component/VechileMap';
import Info from './component/info';
function App() {
  return (
    <div className='w-screen h-screen'>
      <Header/>
      <div className='flex'>
         <Info/>
         <VehicleMap/>
      </div>
    </div>
  );
}

export default App;
