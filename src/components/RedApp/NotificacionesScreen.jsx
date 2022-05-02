import React from 'react'
import { Notificaciones } from '../notifications/Notificaciones'
import Sidebar from '../shared/Sidebar'

export const NotificacionesScreen = () => {
  return (
    <div className="row n-g principal">
      <div className="col-md-3 d-none d-md-block  ">
              <Sidebar/>
      </div>
      <div className="col-md-9">
        <Notificaciones/>
               
      </div>
    </div>
  )
}
