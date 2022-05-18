import { actualizarCarrito} from "./actualizarCarrito.js";
import { productos } from "./stock.js";





const contenedorCarrito = document.getElementById('carrito-contenedor');


// --->Funcion comprar , ejecuta el boton comprar del modal:
const botonVaciar = document.getElementById('comprar')

let carritoDeCompras = [];

botonVaciar.addEventListener('click',()=>{


    if(carritoDeCompras <=0 ){
      
      Swal.fire({
        icon: 'error',
        text: 'Ingrese un producto en el carrito',
      })}else{
      const arrayCompras = carritoDeCompras
      arrayCompras.length = 0;
      
    //--
  

    Swal.fire({
      icon: 'question',
      title: 'Usted desea realizar la compra?',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Swal.fire('Usted realizo la compra con exito!', '', 'success')

        let timerInterval
        Swal.fire({
      title: 'La compra esta siendo procesada',
      html: 'Ejecutando por favor espere... <b></b> milliseconds.',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
    }, 100)
  },
    willClose: () => {
    clearInterval(timerInterval)
    }
      }).then((result) => {
  
    if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
    }
    }) 



      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    actualizarCarrito(arrayCompras);
    vaciarDom();
  }
    

    //--
    
    //Forma alternativa de resetear el productoEnCarrito del DOMContentLoaded--->>
    // location.reload();
})
//Borre el productoEnCarrito del DOM con la siguente funcion ,de la linea 15 del archivo index.js.Este persistia en el DOM por el DOMContentLoaded  --->>
function vaciarDom () {
  let borrar = document.querySelectorAll('.productoEnCarrito');
  borrar.forEach(element => element.remove());
}


export const carritoIndex = (productoId) => {
    if(localStorage.getItem("carrito")) {
        carritoDeCompras = JSON.parse(localStorage.getItem("carrito"));
    }
    console.log(carritoDeCompras)
    let productoRepetido = carritoDeCompras.find (producto => producto.id == productoId);
    contarProductosRepetidos(productoRepetido, productoId);
    eliminarProductoCarrito(productoId);
}


//------------->Eliminar Producto<----------------//
export const eliminarProductoCarrito = (productoId, productoNombre ) => {
  console.log(productoNombre);
  if (localStorage.getItem("carrito")){
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito"));
  }
  let botonEliminar = document.getElementById(`eliminar${productoId}`);

  botonEliminar?.addEventListener('click', () => {
    swal.fire({
      title:`Se elimino el producto con exito`,
      icon: 'success',
      buttons: true ,
      dangerMode: true
    }).then((result) => {
      if (result) {
        botonEliminar.parentElement.remove();
        carritoDeCompras = carritoDeCompras.filter(el => el.id != productoId);
        actualizarCarrito(carritoDeCompras);
      }
    })
  })   
}

//-----> COMPRAR PRODUCTO --->



export const contarProductosRepetidos = (prodRepetido, productoId) => {
  if (prodRepetido){
    prodRepetido.cantidad++
    document.getElementById(`cantidad${prodRepetido.id}`).innerHTML = `<p id=cantidad${prodRepetido.id}>Cantidad:${prodRepetido.cantidad}</p>`;
    actualizarCarrito(carritoDeCompras);
  }else{
    renderProductoCarrito(productoId);
  }
}

const renderProductoCarrito =(productoId) => {
  let producto =productos.find(producto => producto.id == productoId);
  carritoDeCompras.push(producto);
  producto.cantidad = 1;
  let div = document.createElement('div');
  div.classList.add('productoEnCarrito');
  div.innerHTML = ` <p>${producto.nombre}</p>
                    <p>Precio:${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad:${producto.cantidad}</p>
                    <button id="eliminar${producto.id}" class="boton-eliminar"><i class="fa-solid fa-trash-can"></i></button>
                  `
contenedorCarrito.appendChild(div);
actualizarCarrito(carritoDeCompras);
}







