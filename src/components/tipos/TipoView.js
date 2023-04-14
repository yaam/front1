import React, {useState,useEffect} from 'react'
import { crearTiposEquipos, getTiposEquipos } from '../../services/tipoEquipoService'
import dayjs from 'dayjs';
import swal from  'sweetalert2';
 

export const TipoView = (handleOpenModal) => {

    const [formulario, setFormulario] = useState({});
    const [tiposEquipos, setTiposEquipos] = useState([]);
    const [estados, setEstados] = useState([]);
    const {nombre = '', estado, fechaCreacion, fechaActualizacion} = formulario;
    
    
    console.log(nombre);

    const listarTipoEquipo = async() =>{
      try{
        swal.fire({
            allowOutsideClick: false,
            text: 'cargando...'
        })
        swal.showLoading();
        const {data} = await getTiposEquipos();
        console.log(data);
        setTiposEquipos(data);
        setEstados(data);
        swal.close();
      } catch (error){
        console.log(error);
        swal.close();
      }
    }
     useEffect(()=>{
      listarTipoEquipo();
    }, []);
  

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormulario({...formulario, [e.target.name]: e.target.value}) // spread
  }
  
  const handleOnSubmit = async(e) =>{
    e.preventDefault();
    console.log(formulario);
    setTiposEquipos([...tiposEquipos, formulario]);
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
      const { data} = await crearTiposEquipos(formularios);
      console.log(data);
      swal.close();
      handleOpenModal();
      listarTipoEquipo();
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
    <h3>Marcas</h3>
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
                                                          value={estados}>
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
                                                                    tiposEquipos.map((tipoEquipo)=>{
                                                                      return (
                                                                        <table class="table table-striped" key={tipoEquipo._id}>
                                                                        <thead>
                                                                        <tr>
                                                                        <ul className="list-group list-group-horizontal" key={tipoEquipo._id}>
                                                                        <th scope="col">Nombre</th>
                                                                        <li className="list-group-item"  key={tipoEquipo.nombre}>{tipoEquipo.nombre}
                                                                        </li>
                                                                        <th scope="col">estado</th>
                                                                        <li className="list-group-item"  key={tipoEquipo.estado}>{tipoEquipo.estado}
                                                                        </li>
                                                                        <th scope="col">Fecha Creacion</th>
                                                                        <li className="list-group-item"  key={tipoEquipo.fechaCreacion}>{dayjs(tipoEquipo.fechaCreacion).format('YYYY-MM-DD')}
                                                                        </li>
                                                                        <th scope="col">Fecha Actualizaciòn</th>
                                                                        <li className="list-group-item"  key={tipoEquipo.fechaActualizacion}>{dayjs(tipoEquipo.fechaActualizacion).format('YYYY-MM-DD')}
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