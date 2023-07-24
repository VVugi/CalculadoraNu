import {useEffect, useState} from 'react'
import './App.css'

function App()
{
   interface Concepto {
      dinero: number;
      intervalo: number;
   }

   const [dias, setDias] = useState(30);

   const [conceptos, setConceptos] = useState([
      // {
      //    dinero: 300,
      //    intervalo: 1,
      // },
      {
         dinero: 13000,
         intervalo: 30,
      },
   ]);

   const [gananciaFinal, setGananciaFinal] = useState(0);

   function getConceptos()
   {
      return conceptos.map(({dinero, intervalo}: Concepto) => <h3>{dinero} cada {intervalo} dias</h3>)
   }

   function getTotal()
   {
      let total = 0;
      
      conceptos.forEach(({dinero, intervalo}: Concepto) => {
         total += (dinero * Math.ceil(dias / intervalo));
      });

      return <h3>{total.toFixed(2)}</h3>
   }

   function getGananciaDiariaTotal()
   {
      let total = 0;
      let totalExtra : number;

      conceptos.forEach(({dinero, intervalo}: Concepto) => {
         for(let j = 0; j < Math.ceil(dias / intervalo); j++)
         {
            totalExtra = 0;
            let diasIntervalo = dias - (j * intervalo);

            for(let i = 1; i < diasIntervalo; i++)
            {
               totalExtra += (totalExtra + (dinero)) * 0.09 / 365;
            }

            total += totalExtra;
         }
      });

      setGananciaFinal(total);

      return <h3>{total.toFixed(2)}</h3>
   }

   // useEffect(() => {
   //    console.log(gananciaFinal);
   // }, [gananciaFinal]);

   return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
         <div style={{display: 'flex', gap: 30, alignItems: 'center', justifyContent: 'center'}}>
            <h1 style={{verticalAlign: 'center'}}>Dias: </h1>

            <input onChange={(e) => setDias(Number(e.target.value))} value={dias} style={{
                  width: 100,
                  height: 50,
                  fontSize: 40,
                  textAlign: 'center',
                  
               }}
            />
         </div>

         <div style={{display: 'flex', gap: 30}} className="">
            <div>
               <h2>Conceptos: </h2>

               {getConceptos()}
            </div>
            
            <div className="">
               <h2>Total de conceptos:</h2>

               {getTotal()}
            </div>

            <div className="">
               <h2>Total ganancia Nu:</h2>

               {getGananciaDiariaTotal()}
            </div>

            <div className="">
               <h2>Ganancia diaria final:</h2>

               <h3>{gananciaFinal.toFixed(2)}</h3>
            </div>
         </div>
      </div>
   );
}

export default App
