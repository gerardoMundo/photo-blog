export const uploadFile = async (files = []) => {
  if (!files) throw new Error('No se cargaron los archivos');

  const cloudUrl = 'https://api.cloudinary.com/v1_1/djuoeymug/image/upload';

  const formData = new FormData();

  formData.append('upload_preset', 'react-fotoblogg');
  formData.append('file', files);

  try {
    const response = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Ocurrio un error en la solicitud');

    const cloudResp = await response.json();

    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
