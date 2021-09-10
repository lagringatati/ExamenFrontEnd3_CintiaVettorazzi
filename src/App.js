/*****************************************************************************/
/*Importo estilos, paquetes, componentes, datos, etc*/
import  React, {Component} from 'react';
import './css/App.css';
import sweetAlert from 'sweetalert2';
import Historia from './componentes/Historia.js';
import Opciones from './componentes/Opciones.js';
import Recordatorio from './componentes/Recordatorio.js';
import datos from './json/data.json';
/*****************************************************************************/
/*Declaro variables e inicializo en algunos casos */
let opcionesAnteriores = [];
let aux = 1;
let botonLocal;
let idLocal;
let salida = 0;
/*****************************************************************************/
class App extends Component {
  //creo el constructor para agregar estados
  constructor(props) {
    super(props)  //hereda y usa las props del "React.Component"
    this.state = {
      contador: 0,
      seleccionPrevia: "",
    }
    this.handleClick = this.handleClick.bind(this);
  }
  //pantallita "alerta" de inicio
  componentDidMount() {
    sweetAlert.fire({
      imageUrl: 'https://previews.123rf.com/images/andreykuzmin/andreykuzmin1709/andreykuzmin170900025/85206734-fondo-de-mapa-antiguo-con-br%C3%BAjula-y-regla-concepto-de-aventura-o-descubrimiento-.jpg',
      imageHeight: 300,
      title: "¿Estás listo para comenzar tu aventura?"
    })
  }
  //dependiendo de la salida del SCU actualizo o no estados según los cambios
  shouldComponentUpdate(prevState){
    return (prevState.contador !== this.state.contador)
  }
  //si el SCU es true, se ejecuta el CDU. En caso de no crear previamente el SCU se puede poner un condicional directamente en el CDU
  componentDidUpdate(prevState) {
  //  if (prevState.contador !== this.state.contador) 
      opcionesAnteriores.push(this.state.seleccionPrevia);
    //}
  }
  //muestro un "alert" (por default) al desmontar la app
  componentWillUnmount(){
      alert("Se desmontará la app");
  }

  //es el evento que interacciona con el usuario mediante un click
  handleClick(botonElegido) {
    if (this.state.contador >= datos.length - 2) {  //cuando se llegue al final de las opciones posibles
      sweetAlert.fire({ //permito seleccionar si recomenzar o no
        title: "¿Querés comenzar una nueva aventura?",
        imageUrl: 'https://2.bp.blogspot.com/-5DRx-WhAIlc/Vs93eUlKZFI/AAAAAAAADQo/NTV32Bkzsx4/s1600/final-feliz.jpg',
        imageWidth: 500,
        backdrop: `rgba(0,0,0,1)`,
        showCancelButton: true,
        confirmButtonText: 'Sí!',
        cancelButtonText: 'No'
      }).then((respuesta) => {
        if (respuesta.value === true) {
          opcionesAnteriores.push(botonElegido);  //pusheo la ultima eleccion para no perderla al reiniciar
          sweetAlert.fire({
            title: "Preparando para recomenzar",
            backdrop: `rgba(0,0,0,1)`,
            imageUrl: 'https://i.gifer.com/STd1.gif',
            imageHeight: 300,
            timer: 3000,
            showConfirmButton: false,
          })
          this.setState({ //seteo mis estados iniciales nuevamente
            contador: 0,
            seleccionPrevia: ""
          });
          //inicializo variables auxiliares nuevamente para recomenzar
          opcionesAnteriores = [];
          aux = 1;
          salida = 0;
        } else {  //si la respuesta es NO recomenzar
          sweetAlert.fire({ //muestro pantallita de finalizacion
            title: "Hasta la próxima!!",
            backdrop: `rgba(0,0,0,1)`,
            imageUrl: 'https://i.pinimg.com/originals/15/20/65/1520658d8aacd223787b59806698801a.gif',
            imageHeight: 300,
            showConfirmButton: false,
          })
        }
      })
    } else {  //aún quedan opciones posibles para seguir eligiendo
      aux = aux + 1;  //avanzo 1 en el "nivel de preguntas"
      if (aux <= (datos.length + 1) / 2) {  //si el "nivel" de preguntas está dentro de las opciones a elegir
        botonLocal = botonElegido.toLowerCase();  //convierto en minúscula la letra de opcion elegida
        idLocal = aux + botonLocal; //concateno el "nivel" y la opcion elegida
        salida = datos.findIndex(dato=> dato.id===idLocal); //busco en cada elemento del json el que coincida con la opcion elegida
        //seteo mi nuevo estado por cada opcion que elija
        this.setState({
          contador: salida, 
          seleccionPrevia: botonElegido 
        })
      }
    }
  } //fin handleClick
  //render es lo q finalmente visibilizaré (dentro de #root)
  render() {
    return (
      <div className="App">
        <div className="layout">
          <Historia historiaElegida={datos[this.state.contador].historia} /> 
          <Opciones handleClick={this.handleClick}
            primerOpcion={datos[this.state.contador].opciones.a}
            segundaOpcion={datos[this.state.contador].opciones.b}/>
          <Recordatorio
            seleccion={this.state.seleccionPrevia}
            historial={opcionesAnteriores.map((eleccion, indice) => (
                          <li key={indice}>
                              {eleccion}
                          </li>
                      ))}/>
        </div>
      </div>
    )
  }
} //fin class App

export default App;