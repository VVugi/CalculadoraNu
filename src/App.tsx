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
      {
         dinero: 5000,
         intervalo: 15,
      },
   ]);

   const [conceptoNuevo, setConceptoNuevo] = useState({
      dinero: 0,
      intervalo: 0,
   });

   const [totalConceptos, setTotalConceptos] = useState(0);
   const [gananciaDiariaFinal, setGananciaDiariaFinal] = useState(0);
   const [gananciaDiariaTotal, setGananciaDiariaTotal] = useState(0);

   useEffect(() => {
      let totalConceptos = 0;
      let totalGanancia = 0;
      
      conceptos.forEach(({dinero, intervalo}: Concepto) => {
         totalConceptos += (dinero * Math.ceil(dias / intervalo));
      });

      setTotalConceptos(totalConceptos);

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

            totalGanancia += totalExtra;
         }
      });

      setGananciaDiariaTotal(totalGanancia);

      setGananciaDiariaFinal((totalConceptos + totalGanancia) * 0.09 / 365);
   }, [dias, conceptos]);

   function manageConcepto(e: any)
   {
      setConceptoNuevo({
         ...conceptoNuevo,
         [e.target.id]: (e.target.value),
      });
   }

   function agregarConcepto()
   {
      setConceptos([...conceptos, {
         dinero: Number(conceptoNuevo.dinero),
         intervalo: Number(conceptoNuevo.intervalo),
      }]);
   }

   function eliminarConcepto(id: string)
   {
      setConceptos(conceptos.filter(({dinero, intervalo}: Concepto) => dinero + "-" + intervalo != id));
   }

   return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
         <div style={{display: 'flex', gap: 50, justifyContent: 'center'}}>
            <div style={{display: 'flex', gap: 20, alignItems: 'center'}}>
               <h1 style={{verticalAlign: 'center'}}>Dias: </h1>

               <input onChange={(e) => setDias(Number(e.target.value))} value={dias} style={{
                     width: 100,
                     height: 50,
                     fontSize: 40,
                     textAlign: 'center',
                  }}
               />
            </div>

            <h1>Total: ${(totalConceptos + gananciaDiariaTotal).toFixed(2)}</h1>
         </div>

         <div style={{display: 'flex', gap: 30}} className="">
            <div>
               <h2>Conceptos: </h2>

               {conceptos.map(({dinero, intervalo}: Concepto) => <h3 key={dinero + "-" + intervalo}>${dinero} cada {intervalo == 1 ? "dia" : intervalo + " dias"}<a onClick={() => eliminarConcepto(dinero + "-" + intervalo)}style={{color: 'grey'}}> X</a></h3>)}

               <br></br>
            </div>
            
            <div className="">
               <h2>Total de conceptos:</h2>

               {<h3>${totalConceptos.toFixed(2)}</h3>}
            </div>

            <div className="">
               <h2>Total de ganancia Nu:</h2>

               {<h3>${gananciaDiariaTotal.toFixed(2)}</h3>}
            </div>

            <div className="">
               <h2>Ganancia diaria final:</h2>

               <h3>${gananciaDiariaFinal.toFixed(2)}</h3>
            </div>
         </div>

         <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'black', borderRadius: 10, padding: '10px'}}>
            <h3>Agregar concepto</h3>
            
            <div style={{display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center'}}>
               <h3>Cantidad: </h3>
               <input id="dinero" value={conceptoNuevo.dinero} onChange={(e) => manageConcepto(e)} style={{
                     width: 110,
                     height: 30,
                     fontSize: 30,
                     textAlign: 'center',
                  }}
               >
               </input>
            </div>

            <div style={{display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center'}}>
               <h3>Cada cuantos dias: </h3>
               <input id="intervalo" value={conceptoNuevo.intervalo} onChange={(e) => manageConcepto(e)} style={{
                     width: 80,
                     height: 30,
                     fontSize: 30,
                     textAlign: 'center',
                  }}
               >
               </input>
            </div>
            
            <br></br>
            
            <button style={{backgroundColor: 'grey'}} onClick={() => agregarConcepto()}>Guardar</button>
         </div>
      </div>
   );
}

export default App
