module.exports = {
  /**
   * sell-request controller
   */
  async create(ctx: any) {
    try {
      // Create the sell-request entry
      const sellRequest = await strapi.service('api::sell-request.sell-request').create(ctx.request.body);

      // Send the email
      await strapi.plugins['email'].services.email.send({
        to: 'contacto.eliteautomotora@gmail.com',
        from: 'no-reply@eliteautomotora.cl', // e.g., strapi@example.com
        subject: 'Nueva solicitud de venta de vehículo',
        text: `Se ha recibido una nueva solicitud de venta de vehículo con los siguientes datos:

Marca: ${sellRequest.marca}
Modelo: ${sellRequest.modelo}
Año: ${sellRequest.year}
Transmisión: ${sellRequest.transmission}
Llaves: ${sellRequest.llaves}
Dueños: ${sellRequest.ownersCount}
Mantenciones: ${sellRequest.mantenciones}
Descripción: ${sellRequest.description}

Por favor, revisa la solicitud en el panel de administración de Strapi.`,
      });

      return sellRequest;
    } catch (err) {
      ctx.response.status = 500;
      return { error: { message: 'There was a problem creating the sell-request.' } };
    }
  },
};
