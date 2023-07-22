import {useState} from 'react'
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
         dinero: 6000,
         intervalo: 15,
      },
   ]);

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
      let totalExtra = 0;
      
      conceptos.forEach(({dinero}: Concepto) => {
         for(let i = 1; i < dias; i++)
         {
            totalExtra += (totalExtra + dinero) * 0.09 / 365;

            if(dinero == 6000)
            {
               console.log(totalExtra);
            }
         }

         console.log("--------------------");

         total += totalExtra;
      });

      return <h3>{total.toFixed(2)}</h3>
   }

   function getGananciaDiariaFinal()
   {
      let total = 0;
      let totalExtra = 0;

      conceptos.forEach(({dinero}: Concepto) => {
         for(let i = 1; i < dias; i++)
         {
            totalExtra += (totalExtra + dinero) * 0.09 / 365;
         }

         total += totalExtra;
      });

      return <h3>{total.toFixed(2)}</h3>
   }

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
               <h2>Total por multiplicador:</h2>

               {getGananciaDiariaTotal()}
            </div>

            <div className="">
               <h2>Ganancia diaria final:</h2>

               {getGananciaDiariaFinal()}
            </div>
         </div>
      </div>
   );
}

export default App
