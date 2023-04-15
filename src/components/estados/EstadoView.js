import React, {useState,useEffect} from 'react'
import { crearEstadosEquipos, getEstadosEquipos } from '../../services/estadoEquipoService'
import swal from  'sweetalert2';
import dayjs from 'dayjs';
 

export const EstadoView = (handleOpenModal) => {

    const [formulario, setFormulario] = useState({});
    const [estadoEquipo, setEstadoEquipo] = useState([]);
    const [estados, setEstados] = useState([]);
    const {nombre = '', estado, fechaCreacion, fechaActualizacion} = formulario;
    
    
    console.log(nombre);

    const listarEstado = async() =>{
      try{
        swal.fire({
            allowOutsideClick: false,
            text: 'cargando...'
        })
        swal.showLoading();
        const {data} = await getEstadosEquipos();
        console.log(data);
        setEstadoEquipo(data);
        setEstados(data);
        swal.close();
      } catch (error){
        console.log(error);
        swal.close();
      }
    }
     useEffect(()=>{
      listarEstado();
    }, []);
  

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormulario({...formulario, [e.target.name]: e.target.value}) // spread
  }
  
  const handleOnSubmit =  async (e) =>{
    e.preventDefault();
    console.log(formulario);
    setEstadoEquipo([...estadoEquipo, formulario]);
    const formularios = {
      nombre, 
      estado:{
          _id: estado
      },
      fechaCreacion:{
          _id: fechaCreacion
      },
      fechaActualizacion:{
          _id: fechaActualizacion
      }
  }
  console.log(formularios);
  try {
      swal.fire({
          allowOutsideClick: false,
          text: 'cargando...'
      })
      swal.showLoading();
      const { data} = await crearEstadosEquipos(formularios);
      console.log(data);
      swal.close();
      handleOpenModal();
      listarEstado();
  } catch (error) {
      console.log(error);
      swal.close();
      let mensaje;
      if(error && error.response && error.response.data){
          mensaje = error.response.data;
      }else{
          mensaje = 'Ocurrio un error, por favor intente de nuevo'; 
      }
      swal.fire('Error', mensaje , 'error');
  }
  }
 
  return (
  <div >
    <div className='sidebar-header'>
    <h3>Estados de Equipos</h3>
    </div>
    <div className='container-fluid'>
    <div className='row'>
                <div className='col'>
                  <hr/>
                </div>  
      <form onSubmit={(e)=> handleOnSubmit(e)}>
        
              <div className='row'>
                <div className='col'>
                  <div className="mb-3">
                      <label className="form-label">Nombre</label>
                          <div className="col-sm-10">
                            <input name='nombre' type='text' onChange={ (e) => handleOnChange(e)}
                            value={nombre} className="form-control"/>
                          </div>
                  </div>
                </div>
                                        <div className='col'>
                                                    <div className="mb-3">
                                                          <label className="form-label">Estado</label>
                                                          <select className="form-select" 
                                                          onChange ={ (e) => handleOnChange(e)}
                                                          name="estados"
                                                          required
                                                          value={estado}>
                                                            <option value="">--SELECIONE--</option>
                                                            <option value="Activo">Activo</option>
                                                            <option value="Inactivo">Inactivo</option>
                                                          </select>
                                                    </div>
                                          </div>  
                </div>
                                     <div className='row'>
                                                    <div className='col'>
                                                                <button className="btn btn-primary">Guardar</button>
                                                    </div>
                                      </div>
                                                <div className='col'>
                                                        <hr/>
                                              </div>  
                                                      <div className='row'>
                                                         <div className='col'>
                                                                <ul>
                                                                  {
                                                                    estadoEquipo.map((estadoEquipo)=>{
                                                                      return (
                                                                        <table class="table table-striped" key={estadoEquipo._id}> 
                                                                        <thead>
                                                                        <tr>
                                                                        <ul className="list-group list-group-horizontal" key={estadoEquipo._id}>
                                                                        <th scope="col">Nombre</th>
                                                                        <li className="list-group-item"  key={estadoEquipo.nombre}>{estadoEquipo.nombre}
                                                                        </li>
                                                                        <th scope="col">estado</th>
                                                                        <li className="list-group-item"  key={estadoEquipo.estado}>{estadoEquipo.estado}
                                                                        </li>
                                                                        <th scope="col">Fecha Creacion</th>
                                                                        <li className="list-group-item"  key={estadoEquipo.fechaCreacion}>{dayjs(estadoEquipo.fechaCreacion).format('YYYY-MM-DD')}
                                                                        </li>
                                                                        <th scope="col">Fecha Actualizaciòn</th>
                                                                        <li className="list-group-item"  key={estadoEquipo.fechaActualizacion}>{dayjs(estadoEquipo.fechaActualizacion).format('YYYY-MM-DD')}
                                                                        </li>
                                                                        <li><button type="button" class="btn btn-success">Editar</button></li>
                                                                        </ul>
                                                                        </tr>
                                                                        </thead>
                                                                        </table>
                                                                        )})
                                                                  }
                                                                </ul>
                                                        </div>      
                                                      </div>
                          
              
        
        </form>
        </div>
    </div>
  </div>
  )
}