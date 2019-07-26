const argv = require('yargs')
  .options({
    ubicacion: {
      alias: "u",
      desc: "Ciudad de la cual deseo obtener los datos",
      demand: true
    }
  })
  .help()
  .argv;

const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const obtenerInfo = async (direccion) => {
  try {
    const datosLugar = await lugar.obtenerLugarLatLng(direccion);
    const datosClima = await clima.obtenerClima(datosLugar.lat, datosLugar.lng);
    let resp = `No se pudo determinar el clima ${datosLugar.direccion}`;

    if (datosClima) {
      resp = `El clima de ${datosLugar.direccion} es ${datosClima}`;
    }

    return resp;
  } catch (error) {
    return error;
  }
}

obtenerInfo(argv.ubicacion)
  .then(console.log)
  .catch(console.log);
