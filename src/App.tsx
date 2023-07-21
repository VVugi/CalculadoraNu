import {useState} from 'react'
import './App.css'

function App()
{
   interface Concepto {
      dinero: number;
      intervalo: number;
  }

   const [total, setTotal] = useState(0);

   const [conceptos, setConceptos] = useState([{
      dinero: 50,
      intervalo: 2,
   }]);

   function getConceptos()
   {
      return conceptos.map(({dinero, intervalo}: Concepto) => <h3>{dinero} cada {intervalo} dias</h3>)
   }

   function getTotalDias(dias: number)
   {
      let total = 0;

      conceptos.forEach(({dinero, intervalo}: Concepto) => {
         total += Number(dinero * Math.floor(dias / intervalo) * 0.09 / 365).toFixed(2);
      });

      return <h3>{total}</h3>
   }

   return (
      <div style={{display: 'flex', gap: 80}} className="">
         <div>
            <h1>Conceptos: </h1>

            {getConceptos()}
         </div>
         
         <div className="">
            <h1>Dinero total:</h1>

            {getTotalDias(6)}
         </div>
      </div>
   );
}

export default App
