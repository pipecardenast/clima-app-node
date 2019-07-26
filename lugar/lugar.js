const axios = require('axios');

const obtenerLugarLatLng = async (ubicacion) => {
  const lugar = encodeURI(ubicacion);

  const instance = axios.create({
    baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${lugar}`,
    timeout: 1000,
    headers: { 'X-RapidAPI-Key': 'a1b460ecc4mshbd3de824540d8abp140df5jsn6fb78c251179' }
  });

  const resp = await instance.get();

  if (resp.data.Results.length === 0) {
    throw new Error(`No hay resultados para ${ubicacion}`);
  }

  const datos = resp.data.Results[0];
  const direccion = datos.name;
  const lat = datos.lat;
  const lng = datos.lon;

  return {
    direccion,
    lat,
    lng
  };
}

module.exports = {
  obtenerLugarLatLng
};
