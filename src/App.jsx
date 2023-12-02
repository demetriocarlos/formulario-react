
import { Formulario,Label,   ContenedorBotonCentrado,Boton,ContenedorTerminos, MensajeExito,MensajeError} from "./elementos/Formularios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { ComponenteInput } from "./Componentes/Input"
import { useState } from "react"



export const App = ( ) => {

   const [usuario,cambiarUsuario] = useState({campo:'', valido:null})
   const [nombre,cambiarNombre] = useState({campo:'', valido:null})
   const [password,cambiarPassword] = useState({campo:'', valido:null})
   const [password2,cambiarPassword2] = useState({campo:'', valido:null})
   const [correo,cambiarCorreo] = useState({campo:'', valido:null})
   const [telefono,cambiarTelefono] = useState({campo:'', valido:null})
   const [terminos, cambiarTerminos] = useState(false);
   const [formularioValido, cambiarFormularioValido] = useState(null)


   const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }


  const validarPassword2= () =>{
      if(password.campo.length > 0){
        if(password.campo !== password2.campo){
           cambiarPassword2((prevState) => {
            return {...prevState, valido: 'false'}
           })
        }else{
          cambiarPassword2((prevState) => {
            return {...prevState, valido: 'true'}
           })
        }
      }
  }


  const onChangeTerminos = (e) =>{
      cambiarTerminos(e.target.checked)
  }

  const onSubmit = (e) =>{
    e.preventDefault();

    if(
      usuario.valido === 'true' &&
      nombre.valido === 'true' &&
      password.valido === 'true' &&
      password2.valido === 'true' &&
      correo.valido === 'true' &&
      telefono.valido === 'true' &&
      terminos
    ){
      cambiarFormularioValido(true)
      cambiarUsuario({campo:'' , valido:null})
      cambiarNombre({campo:'' , valido:null})
      cambiarPassword({campo:'' , valido:null})
      cambiarPassword2({campo:'' , valido:null})
      cambiarCorreo({campo:'' , valido:null})
      cambiarTelefono({campo:'' , valido:null})
    }else{
      cambiarFormularioValido(false)
    }
  }

  return (
    <main>

       <Formulario action="" onSubmit={onSubmit} >
        
          < ComponenteInput
            estado={usuario}
            cambiarEstado={cambiarUsuario}
            type="text"
            label="Usuario"
            placeholder=" usuario"
            name="usuario"
            leyendaError="El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros o letras y guion bajo"
            expresionRegular={expresiones.usuario}
          />

            < ComponenteInput
            estado={nombre}
            cambiarEstado={cambiarNombre}
            type="text"
            label="Nombre"
            placeholder=" nombre"
            name="nombre"
            leyendaError="El nombre solo puede contener letras y espacios."
            expresionRegular={expresiones.nombre}
          />


          < ComponenteInput
            estado={password}
            cambiarEstado={cambiarPassword}
            type="password"
            label="Contraseña"
            name="password1"
            leyendaError="la contraseña tiene que ser de 4 a 16 digitos "
            expresionRegular={expresiones.password}
          />


          < ComponenteInput
            estado={password2}
            cambiarEstado={cambiarPassword2}
            type="password"
            label="Repetir Contraseña"
            name="password2"
            leyendaError="Ambas contraseñas deben ser iguales."
            funcion={validarPassword2}
             
          />


          < ComponenteInput
            estado={correo}
            cambiarEstado={cambiarCorreo}
            type="email"
            label="Correo Electronico"
            placeholder="john@correo"
            name="correo"
            leyendaError="El correo solo puede contener letras, numeros, puntos,guiones y guion bajo "
            expresionRegular={expresiones.correo}
          />


          < ComponenteInput
            estado={telefono}
            cambiarEstado={cambiarTelefono}
            type="text"
            label="Telefono"
            placeholder="6543456280"
            name="telefono"
            leyendaError="El telefono solo puede contener numeros y el maximo son 14 digitos "
            expresionRegular={expresiones.telefono}
          />
 
           
 
            
          
          <ContenedorTerminos>
              <Label htmlFor="terminos">
                 <input type="checkbox" 
                  name="terminos" 
                  id="terminos" 
                  checked={terminos}
                  onChange={onChangeTerminos}
                  />
                 Acepto los Terminos y Condiciones
              </Label>
          </ContenedorTerminos>

          { formularioValido === false && <MensajeError>
              <p>
                <FontAwesomeIcon icon={faTriangleExclamation}/> 
                <b>Error</b> por favor rellene el formulario correctamente.</p>
          </MensajeError>}


          <ContenedorBotonCentrado>
            <Boton type="submit">Enviar</Boton>
            { formularioValido === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
          </ContenedorBotonCentrado>
        
       </Formulario>
    </main>
  )
}

 