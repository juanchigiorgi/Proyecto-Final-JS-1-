//Proyecto
function comprarProductos() {
    let producto = '';
    let precio = 0;
    let cantidad = 0;
    let totalCompra = 0;
    //let cantidadTotal = 0;
    let seguirComprando = false;

    do {
        producto = prompt('¿Queres comprar un vidrio templado, funda o el combo?', 'Ej: combo');
        cantidad = parseInt(prompt('¿Cuantos?'));

        let cantidadValidada = validarCantidad(cantidad);

        switch (producto) {
            case 'Vidrio Templado':
                precio = 540;
                break;
            case 'Funda':
                precio = 310;
                break;
            case 'Combo':
                precio = 850;
                break;
            default:
                alert('Alguno de los datos ingresados no es correcto.');
                precio = 0;
                cantidad = 0;
                break;
        }

        totalCompra += precio * cantidadValidada;
        seguirComprando = confirm('¿Queres agregar otro producto?');

    } while (seguirComprando)

    const totalConDescuento = aplicarDescuento(totalCompra);
    const totalConEnvio = calcularEnvio(totalConDescuento);

    return totalConEnvio;
}

function validarCantidad(cantidad) {
    while(Number.isNaN(cantidad) || cantidad === 0) {
        if (cantidad !== 0) {
            alert('Debe agregar un número.')
        } else {
            alert('Debe ingresar un número distinto de cero.')
        }
        cantidad = parseInt(prompt('¿Cuantos queres comprar?'));
    }

    return cantidad;
}

function aplicarDescuento(totalCompra) {
    let totalConDescuento = 0;

    if (totalCompra >= 5000) {
        totalConDescuento = totalCompra * 0.80;
        return totalConDescuento;
    } else {
        return totalCompra;
    }
}

function calcularEnvio(totalCompra) {
    let tieneEnvioADomicilio = false;

    tieneEnvioADomicilio = confirm('Queres envio a domicilio?');

    if (tieneEnvioADomicilio && totalCompra >= 1000) {
        alert('Tenes envio gratis. El total de la compra es: '+totalCompra);
    } else if (tieneEnvioADomicilio && totalCompra < 2000 && totalCompra !== 0) {
        totalCompra += 200;
        alert('El envío cuesta $200. El total de la compra es: '+totalCompra);
    } else {
        alert('El total de la compra es: '+totalCompra);
    }

    return totalCompra;
}

function calcularCantidadDeCuotas() {
    let cuotas = 0;
    let tieneCuotas = false;

    tieneCuotas = confirm('Queres pagar en cuotas?');

    if (tieneCuotas) {
        cuotas = parseInt(prompt('¿En cuántas cuotas queres pagar?'));
        if (cuotas === 0) {
            cuotas = 1;
        } else if (Number.isNaN(cuotas)) {
            calcularCantidadDeCuotas();
        }
    } else {
        cuotas = 1;
    }

    return cuotas;
}

function calcularIntereses(cuotas) {
    let tasa = 12.3;
    let sinIntereses = 0;
    let tasaTotal = 0;
    let interesesTotales = 0;

    if (cuotas === 1) {
        return sinIntereses;
    } else {
        tasaTotal = tasa + cuotas * 0.2;
        interesesTotales = tasaTotal * cuotas;
        return interesesTotales;
    }
}

function calcularTotalAPagar(totalCompra, cuotas, intereses) {
    totalCompra = totalCompra + intereses;
    let valorCuota = totalCompra / cuotas;
    alert('El total a pagar es: $'+totalCompra+' en '+cuotas+' cuotas de $'+valorCuota);
}

const totalCompra = comprarProductos();
const cuotas = calcularCantidadDeCuotas();
const intereses = calcularIntereses();

calcularTotalAPagar(totalCompra, cuotas, intereses);