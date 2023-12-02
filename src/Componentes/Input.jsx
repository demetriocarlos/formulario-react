
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"


import { Input, Label, Grupoinput, LeyendaError, IconoValidacion } from '../elementos/Formularios'

export const ComponenteInput = ({ estado, cambiarEstado, type, label, placeholder, name, leyendaError, expresionRegular, funcion }) => {

  const onChange = (e) => {
    console.log(e.target.value)
    cambiarEstado({ ...estado, campo: e.target.value })
  }

  const validacion = () => {
    if (expresionRegular) {
      if (expresionRegular.test(estado.campo  )) {
           cambiarEstado({...estado, valido: 'true'})
      }else{
        cambiarEstado({...estado, valido: 'false'})
      }
    }
    if(funcion){
      funcion()
    }
  }

  return (
    <div>
      <Label 
      htmlFor={name} 
      valido={estado.valido}
       /*
      style={{
        color: expresionRegular.test(estado.campo) ? '' : ' #bb2929 ',
      }}*/
      >{label}</Label>
      <Grupoinput>
        <Input
          type={type}
          placeholder={placeholder}
          id={name}
          value={estado.campo}
          onChange={onChange}
          onKeyUp={validacion }
          onBlur={validacion }
          valido={estado.valido}
           /*
          style={{
            border: expresionRegular.test(estado.campo) ? '3px solid #0075ff' : '3px solid #bb2929  ',
          }}*/
        />
         
        {/*
          expresionRegular.test(estado.campo) ? "correcto" :"incorrecto"
        */}

        <IconoValidacion 
        icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} 
        valido={estado.valido} 
        
        />
      </Grupoinput>

      <LeyendaError valido={estado.valido} >{leyendaError}</LeyendaError>
    </div>

  )
}
