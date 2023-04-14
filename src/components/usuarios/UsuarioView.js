import React, {useState,useEffect} from 'react'
import { getUsuarios,crearUsuarios, editarUsuarios } from '../../services/usuarioService'
import swal from  'sweetalert2';
import dayjs from 'dayjs';
import { ModalEdit } from '../ui/ModalEdit';

export const UsuarioView = (handleOpenModal) => {
  
    const [formulario, setFormulario] = useState({});
    const [usuarios, setUsuarios] = useState([]);
    const [estados, setEstados] = useState([]);
    const [actualizar, setActualizar] = useState([]);
    const {nombre = '', email= '', estado, fechaCreacion, fechaActualizacion, usuarioId = ' '} = formulario;
    
    
    console.log(nombre, email);

    const listarUsuario = async() =>{
      try{
        swal.fire({
            allowOutsideClick: false,
            text: 'cargando...'
        })
        swal.showLoading();
        const {data} = await getUsuarios();
        console.log(data);
        setUsuarios(data);
        setEstados(data);
        swal.close();
      } catch (error){
        console.log(error);
        swal.close();
      }
    }
     useEffect(()=>{
      listarUsuario();
    }, []);
  

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormulario({...formulario, [e.target.name]: e.target.value}) // spread
  }
  const handleChange = (e) => {
    setActualizar({...formulario, [e.target.name]: e.target.value})
  }
  
  const handleOnSubmit = async (e) =>{
    e.preventDefault();
    console.log(formulario);
    setUsuarios([...usuarios, formulario]);
    const formularios = {
      nombre,email, 
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
      const { data} = await crearUsuarios(formularios);
      console.log(data);
      swal.close();
      handleOpenModal();
      listarUsuario();
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

  const CloseModal = () =>{
    setUsuarios({nombre: '', email: '' })
  }

  

  const editarUsuario = async (e) =>{
    e.preventDefault();
    console.log(formulario);
    setUsuarios([...usuarios, formulario]);
    const formularios = {
      nombre,email,
      estado:{
          _id: estado
      },
    
  }
  console.log(formularios);
  try {
      swal.fire({
          allowOutsideClick: false,
          text: 'cargando...'
      })
      swal.showLoading();
      const { data} = await editarUsuarios(usuarioId);
      console.log(data);
      swal.close();
      handleOpenModal();
      listarUsuario();
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
    <ModalEdit
          CloseModal={CloseModal}
          handleChange={handleChange}
          nombre={nombre}
          email={email}
          estado={estado}
          editarUsuario={editarUsuario}
          />
    <div classNameName='sidebar-header'>
    <h3>Usuarios</h3>
    </div>
    <div classNameName='container-fluid'>
    <div classNameName='row'>
                <div classNameName='col'>
                  <hr/>
                </div>  
      <form onSubmit={(e)=> handleOnSubmit(e)}>
        <div>
                    <div classNameName='row'>
                      <div classNameName='col'>
                        <div classNameName="mb-3">
                            <label className="form-label">Nombre</label>
                                <div className="col-sm-10">
                                  <input name='nombre' type='text' onChange={ (e) => handleOnChange(e)}
                                  value={nombre} className="form-control"/>
                                </div>
                        </div>
                      </div>      
                            <div className="col">
                              <div className="mb-3">
                                  <label  className="form-label">Email</label>
                                  <div className="col-sm-10">
                                    <input name='email' type="text" value={email} 
                                    onChange={(e) => handleOnChange(e)}
                                    classNameName="form-control"/>
                                  </div>    
                              </div>
                            </div>
                                      <div className='col'>
                                                    <div className="mb-3">
                                                          <label className="form-label">Estado</label>
                                                          <select className="form-select" 
                                                          onChange ={ (e) => handleOnChange(e)}
                                                          name="estado"
                                                          required
                                                          value={estados}>
                                                            <option value="">--SELECIONE--</option>
                                                            <option value={true}>Activo</option>
                                                            <option value={false}>Inactivo</option>
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
                                                                                  usuarios.map((usuario)=>{
                                                                                    return (
                                                                        <table className="table table-striped" key={usuario._id}>
                                                                        <thead>
                                                                        <tr>
                                                                        <ul className="list-group list-group-horizontal" key={usuario._id}>
                                                                        <th scope="col">Nombre</th>
                                                                        <li className="list-group-item"  key={usuario.nombre}>{usuario.nombre}
                                                                        </li>
                                                                        <th scope="col">Email</th>
                                                                        <li className="list-group-item"  key={usuario.email}>{usuario.email}
                                                                        </li>
                                                                        <th scope="col">estado</th>
                                                                        <li className="list-group-item"  key={usuario.estado}>{usuario.estado}
                                                                        </li>
                                                                        <th scope="col">Fecha Creacion</th>
                                                                        <li className="list-group-item"  key={usuario.fechaCreacion}>{dayjs(usuario.fechaCreacion).format('YYYY-MM-DD')}
                                                                        </li>
                                                                        <th scope="col">Fecha Actualizaciòn</th>
                                                                        <li className="list-group-item"  key={usuario.fechaActualizacion}>{dayjs(usuario.fechaActualizacion).format('YYYY-MM-DD')}
                                                                        </li>
                                                                        <li><button  type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" >Editar</button></li>
                                                                        </ul>
                                                                        </tr>
                                                                        </thead>
                                                                        </table>
                                                                                      )})
                                                                                }
                                                                              </ul>
                                                                      </div>      
                                                                    </div>
                          
              
            </div>
          
        </form>
      </div>
    </div>
  </div>
  )
}