import React from 'react'
import CustomHeader from '../CustomHeader/CustomHeader'

const ActasRechazadas = () => {
  return (
    <div>

<CustomHeader></CustomHeader>
            
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Almacen</th>
                        <th scope="col">Tipo de Acta</th>
                        <th scope="col">Nombre de Acta</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Periodo Inventarial</th>
                        <th scope="col">Estado</th>
                        <th scope="col">HDR</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                {Datos.map((row) => (
                    <DatoasActasDB data={row} />
                ))}
            </table>
    </div>
  )
}  

export default ActasRechazadas