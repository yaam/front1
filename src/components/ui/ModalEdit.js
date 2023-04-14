import React from 'react'


export const ModalEdit = (CloseModal, handleChange, nombre,email,estado,editarUsuario) => {
  return (
    <div className="modal fade" id="exampleModal" tabindex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
        <button 
        type="button" 
        className="btn-close" 
        data-bs-dismiss="modal" 
        aria-label="Close"
        onClick={CloseModal}>

        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlfor="recipient-name" className="col-form-label">Nombre:</label>
            <input type="text" className="form-control" id="recipient-name"
            name='nombre' 
            onChange={handleChange} value={nombre}/>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Email:</label>
            <input type="text" className="form-control" id="recipient-name"
            name='email' 
            onChange={handleChange} value={email}/>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Estado:</label>
            <select 
                    className="form-control" 
                    id="status"
                    name="estado"
                    onChange={handleChange}
                    value={estado}
                >
                <option value={false}>Inactivo</option>
                <option value={true}>Activo</option>
              </select>          
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button 
        type="button" 
        className="btn btn-secondary" 
        data-bs-dismiss="modal"
        onClick={CloseModal}>Close</button>
        
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={editarUsuario}
              
            >
            Enviar
            </button>
        
      </div>
    </div>
  </div>
</div>

  )
}
