import React from 'react'

const datos = ({data}) => {
  return (
    <div>
        <tbody>
    <tr>
      <th scope="row">1</th>
      <td>{data.Tienda}</td>
      <td>{data.Rectificacion}</td>
      <td>{data.Pedido}</td>
      <td>{data.Fecha}</td>
      <td>{data.Bultos}</td>
      <td>{data.Resolucion}</td>
      <td>{data.DebitoT}</td>

    </tr>
    </tbody>

    </div>
  )
}

export default datos