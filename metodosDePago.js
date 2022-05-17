

// Controlo los botones para poder seleccionar el metodo de compra.

    const checked1 = document.getElementById("efectivo");
    const checked2 = document.getElementById("tarjeta");
        checked1.addEventListener("click", respuestaClick1)
        function respuestaClick1(){
            if(checked1.checked != false){
                checked2.checked = null;
            }
        }
    
        checked2.addEventListener("click", respuestaClick2)
            function respuestaClick2(){
                if(checked2.checked != false){
                    checked1.checked = null;
                }
            } 

//------
//-----

